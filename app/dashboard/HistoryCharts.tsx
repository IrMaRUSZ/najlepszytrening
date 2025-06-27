'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { useMemo } from 'react';
import { format, startOfWeek } from 'date-fns';
import { DailyEntry } from './page';
import styles from '../../styles/Dashboard.module.css';

// Rejestracja wszystkich potrzebnych elementów Chart.js (to jest kluczowa linia)
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

interface HistoryChartsProps {
  entries: DailyEntry[];
}

export default function HistoryCharts({ entries }: HistoryChartsProps) {
  const weeklyAggregatedData = useMemo(() => {
    if (!entries || entries.length === 0) return [];
    
    const getAverage = (arr: (number | null | undefined)[]) => {
      const validNumbers = arr.filter((n): n is number => typeof n === 'number' && !isNaN(n));
      if (validNumbers.length === 0) return null;
      return validNumbers.reduce((a, b) => a + b, 0) / validNumbers.length;
    };
    
    const weeklyGroups = new Map<string, { date: Date, entries: DailyEntry[] }>();
    entries.forEach(entry => {
        if(!entry.entry_date) return;
        const weekStart = startOfWeek(new Date(entry.entry_date), { weekStartsOn: 1 });
        const weekKey = weekStart.toISOString().split('T')[0];
        if (!weeklyGroups.has(weekKey)) {
            weeklyGroups.set(weekKey, { date: weekStart, entries: [] });
        }
        weeklyGroups.get(weekKey)!.entries.push(entry);
    });

    const sortedWeeks = Array.from(weeklyGroups.values()).sort((a, b) => a.date.getTime() - b.date.getTime());

    return sortedWeeks.map(group => ({
      weekLabel: format(group.date, 'dd.MM'),
      avgWeight: getAverage(group.entries.map(e => e.body_weight)),
      avgSteps: getAverage(group.entries.map(e => e.steps)),
      avgCalories: getAverage(group.entries.map(e => e.calories_eaten)),
    }));
  }, [entries]);
  
  const weightChartOptions = useMemo((): ChartOptions<'line'> => {
    const weights = weeklyAggregatedData.map(w => w.avgWeight).filter((w): w is number => w !== null);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    
    return {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Średnia Tygodniowa Masa Ciała', color: 'rgba(255, 255, 255, 0.9)', font: { size: 16 } },
        tooltip: { callbacks: { label: (context) => `${context.formattedValue} kg` }}
      },
      scales: {
          x: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
          y: {
              title: { display: true, text: 'Waga (kg)', color: 'rgba(255, 255, 255, 0.9)' },
              ticks: { color: 'rgba(255, 255, 255, 0.7)' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              suggestedMin: weights.length > 1 ? Math.floor(minWeight - 2) : undefined,
              suggestedMax: weights.length > 1 ? Math.ceil(maxWeight + 2) : undefined,
          },
      },
    }
  }, [weeklyAggregatedData]);
  
  const weightChartData: ChartData<'line'> = {
    labels: weeklyAggregatedData.map(w => w.weekLabel),
    datasets: [{
        label: 'Średnia Waga',
        data: weeklyAggregatedData.map(w => w.avgWeight),
        borderColor: '#fca311', backgroundColor: 'rgba(252, 163, 17, 0.5)',
        tension: 0.2, pointRadius: 4, pointBackgroundColor: '#fca311', spanGaps: true,
    }],
  };
  
  const activityChartOptions: ChartOptions<'line'> = {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { 
        position: 'top' as const, align: 'center',
        labels: { color: 'rgba(255, 255, 255, 0.9)', padding: 20 }
      },
      title: { display: true, text: 'Średnia Tygodniowa Aktywność i Kalorie', color: 'rgba(255, 255, 255, 0.9)', font: { size: 16 }},
      tooltip: {
            callbacks: {
                label: (context) => {
                    let label = context.dataset.label || '';
                    if (label) label += ': ';
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('pl-PL').format(context.parsed.y);
                        if (context.dataset.label === 'Średnie Kalorie (kcal)') label += ' kcal';
                    }
                    return label;
                }
            }
      }
    },
     scales: {
        x: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
        y: {
            beginAtZero: true,
            title: { display: true, text: 'Ilość', color: 'rgba(255, 255, 255, 0.9)' },
            ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
    },
  };
  
  const activityChartData: ChartData<'line'> = {
    labels: weeklyAggregatedData.map(w => w.weekLabel),
    datasets: [
      {
        label: 'Średnie Kroki',
        data: weeklyAggregatedData.map(w => w.avgSteps),
        borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.2,
      },
      {
        label: 'Średnie Kalorie (kcal)',
        data: weeklyAggregatedData.map(w => w.avgCalories),
        borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.2,
      },
    ],
  };
  
  if (weeklyAggregatedData.length === 0) {
    return null;
  }
  
  return (
    <>
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <Line options={weightChartOptions} data={weightChartData} />
        </div>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <Line options={activityChartOptions} data={activityChartData} />
        </div>
      </div>
    </>
  );
}