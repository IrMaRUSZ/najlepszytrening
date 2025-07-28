// Plik: app/dashboard/WeeklyLogTable.tsx
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameWeek } from 'date-fns';
import { pl } from 'date-fns/locale';
import { DailyEntry } from './page';
import styles from '../../styles/Dashboard.module.css';

type WeekEntry = { day: Date; entry_date: string; } & DailyEntry;

type WeekSummary = {
    avg_steps?: number; avg_calories_eaten?: number; avg_sleep_hours?: number;
    avg_kilometers_ran?: number; last_body_weight?: number; total_trainings?: number;
};

const METRIC_CONFIG: { [key: string]: { label: string, type: 'number' | 'checkbox', step?: string, placeholder?: string } } = {
  body_weight: { label: 'Waga (kg)', type: 'number', step: '0.1', placeholder: '85.5' },
  steps: { label: 'Kroki', type: 'number', placeholder: '8000' },
  was_training: { label: 'Trening?', type: 'checkbox' },
  sleep_hours: { label: 'Sen (h)', type: 'number', step: '0.1', placeholder: '7.5' },
  kilometers_ran: { label: 'Bieganie (km)', type: 'number', step: '0.1', placeholder: '5.2' },
  calories_eaten: { label: 'Kalorie', type: 'number', placeholder: '2500' },
};

// ZMIANA: Zaktualizowano interfejs propsów
interface WeeklyLogTableProps {
  userId: string;
  trackedMetrics?: string[];
  initialEntries: DailyEntry[];
  currentDate: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onGoToCurrent: () => void;
}

// ZMIANA: Zaktualizowano sygnaturę komponentu
export default function WeeklyLogTable({ userId, trackedMetrics = [], initialEntries, currentDate, onPreviousWeek, onNextWeek, onGoToCurrent }: WeeklyLogTableProps) {
    // USUNIĘTO: Lokalny stan `viewedDate` został usunięty. Używamy `currentDate` z props.
    const [weekData, setWeekData] = useState<WeekEntry[]>([]);
    const [allEntries, setAllEntries] = useState<DailyEntry[]>(initialEntries);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => { setAllEntries(initialEntries); }, [initialEntries]);

    // ZMIANA: useEffect zależy teraz od `currentDate` z props, a nie od lokalnego `viewedDate`.
    useEffect(() => {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
        
        // Ta logika pozostaje, ale teraz operuje na `initialEntries`, które są zawsze aktualne.
        const existingEntriesMap = new Map((allEntries || []).map(e => [e.entry_date!, e]));
        const preparedWeekData = weekDays.map(day => ({
            day,
            entry_date: format(day, 'yyyy-MM-dd'),
            ...existingEntriesMap.get(format(day, 'yyyy-MM-dd')) || {}
        }));
        setWeekData(preparedWeekData);
    }, [currentDate, allEntries]);
    
    // USUNIĘTO: Lokalne handlery nawigacji. Zostaną użyte te z props.

    const handleSaveEntry = useCallback(async (entryData: DailyEntry) => {
        const { error } = await supabase
            .from('daily_entries')
            .upsert({ ...entryData, user_id: userId }, { onConflict: 'user_id,entry_date' });

        if (error) {
            console.error('Błąd podczas zapisywania wpisu:', error);
        }
    }, [userId]);
        
    const handleInputChange = useCallback((dateStr: string, field: string, value: string | number | boolean | null) => {
        let entryToUpdate: DailyEntry | undefined;
        const updatedAllEntries = [...allEntries];
        const entryIndex = updatedAllEntries.findIndex(e => e.entry_date === dateStr);
        if (entryIndex > -1) {
            entryToUpdate = { ...updatedAllEntries[entryIndex], [field]: value };
            updatedAllEntries[entryIndex] = entryToUpdate;
        } else {
            entryToUpdate = { user_id: userId, entry_date: dateStr, [field]: value };
            updatedAllEntries.push(entryToUpdate);
        }
        setAllEntries(updatedAllEntries);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => { handleSaveEntry(entryToUpdate!); }, 1500);
    }, [allEntries, handleSaveEntry, userId]);
    
    const weeklySummaries = useMemo(() => {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEntries = allEntries.filter(e => e.entry_date && new Date(e.entry_date) >= weekStart && new Date(e.entry_date) < endOfWeek(weekStart, { weekStartsOn: 1 }));
        
        // Pozostała logika podsumowania jest OK.
        const calculateSummary = (entries: DailyEntry[]): WeekSummary => {
            const isNumeric = (val: unknown): val is number => typeof val === 'number' && !isNaN(val);
            const getAverage = (data: (number | null | undefined)[]) => {
                const validNumbers = data.filter(isNumeric);
                return validNumbers.length > 0 ? validNumbers.reduce((a, b) => a + b, 0) / validNumbers.length : 0;
            };
            const getLastWeight = (data: DailyEntry[]): number | undefined => {
                const latest = [...data].filter(d => isNumeric(d.body_weight)).sort((a, b) => new Date(b.entry_date!).getTime() - new Date(a.entry_date!).getTime());
                return latest.length > 0 ? (latest[0].body_weight ?? undefined) : undefined;
            };
            return {
                avg_calories_eaten: getAverage(entries.map(e => e.calories_eaten)),
                avg_steps: getAverage(entries.map(e => e.steps)),
                avg_sleep_hours: getAverage(entries.map(e => e.sleep_hours)),
                total_trainings: entries.filter(e => e.was_training === true).length,
                last_body_weight: getLastWeight(entries),
                avg_kilometers_ran: getAverage(entries.map(e => e.kilometers_ran)),
            };
        };
        return { current: calculateSummary(weekEntries), previous: {} }; // Uproszczono logikę dla `previous`
    }, [allEntries, currentDate]);
    
    const formatDecimalHours = (hours?: number) => {
        if (hours === undefined || hours === 0) return '—';
        const h = Math.floor(hours);
        const m = Math.round((hours - h) * 60);
        return `${h}h ${m > 0 ? `${m}min` : ''}`.trim();
    };
    
    const isCurrentWeek = isSameWeek(currentDate, new Date(), { weekStartsOn: 1 });
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1, locale: pl });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1, locale: pl });
    const weekHeader = `Tydzień: ${format(weekStart, 'dd.MM.yyyy')} - ${format(weekEnd, 'dd.MM.yyyy')}`;

    return (
        <div className={styles.tableContainer}>
            <div className={styles.weekNavigationHeader}>
                 {/* ZMIANA: Ta nawigacja teraz kontroluje całą aplikację */}
                <h2>{weekHeader}</h2>
                <div className={styles.navigationButtons}>
                    <button className={styles.navigationButton} onClick={onPreviousWeek}>← Poprzedni</button>
                    <button onClick={onGoToCurrent} disabled={isCurrentWeek} className={`${styles.navigationButton} ${isCurrentWeek ? styles.currentWeek : ''}`}>Bieżący</button>
                    <button className={styles.navigationButton} onClick={onNextWeek} disabled={isCurrentWeek}>Następny →</button>
                </div>
            </div>
            
            <table className={styles.weeklyTable}>
                <thead>
                    <tr>
                        <th>Dzień</th>
                        {(trackedMetrics || []).map(m => <th key={m}>{METRIC_CONFIG[m]?.label || m}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {weekData.map(entry => (
                        <tr key={entry.entry_date}>
                            <td data-label="Dzień">{format(entry.day, 'EEEE, dd.MM', { locale: pl })}</td>
                            {(trackedMetrics || []).map(metricKey => {
                                const config = METRIC_CONFIG[metricKey];
                                if (!config) return <td key={metricKey}>?</td>;
                                const value = entry[metricKey as keyof DailyEntry];
                                return (
                                    <td key={metricKey} data-label={config.label}>
                                        <input
                                            placeholder={config.placeholder}
                                            type={config.type}
                                            step={config.step}
                                            value={config.type !== 'checkbox' ? (String(value ?? '')) : undefined}
                                            checked={config.type === 'checkbox' ? !!value : undefined}
                                            onChange={(e) => handleInputChange(
                                                entry.entry_date, 
                                                metricKey, 
                                                e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : (e.target.value === '' ? null : Number(e.target.value))
                                            )}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td data-label="Wynik">Wynik</td>
                        {(trackedMetrics || []).map(metric => {
                            const summary = weeklySummaries.current;
                            let value: string | number = '—';
                            if (metric === 'body_weight') value = summary.last_body_weight?.toFixed(1) ?? '—';
                            if (metric === 'steps') value = summary.avg_steps?.toFixed(0) ?? '—';
                            if (metric === 'calories_eaten') value = summary.avg_calories_eaten?.toFixed(0) ?? '—';
                            if (metric === 'was_training') value = summary.total_trainings ?? 0;
                            if (metric === 'kilometers_ran') value = summary.avg_kilometers_ran?.toFixed(2) ?? '—';
                            if (metric === 'sleep_hours') value = formatDecimalHours(summary.avg_sleep_hours);
                            return <td key={`${metric}-current`} data-label={METRIC_CONFIG[metric]?.label}>{value}</td>
                        })}
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}