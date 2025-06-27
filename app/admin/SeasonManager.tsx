// Plik: app/admin/SeasonManager.tsx
// OSTATECZNA, KOMPLETNA WERSJA
'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Admin.module.css';

interface Season {
  id: number;
  name: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
}

export default function SeasonManager() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Stany dla formularza tworzenia nowego sezonu
  const [newSeasonName, setNewSeasonName] = useState('');
  const [newSeasonStartDate, setNewSeasonStartDate] = useState(''); // <-- NOWY STAN
  const [newSeasonEndDate, setNewSeasonEndDate] = useState('');     // <-- NOWY STAN

  const fetchSeasons = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('seasons')
      .select('id, name, is_active, start_date, end_date')
      .order('id', { ascending: false });

    if (error) {
      console.error("Błąd pobierania sezonów:", error.message);
      alert("Błąd pobierania sezonów.");
    } else {
      setSeasons(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSeasons();
  }, [fetchSeasons]);

  const handleCreateSeason = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newSeasonName.trim() || !newSeasonStartDate || !newSeasonEndDate) { // <-- POPRAWIONA WALIDACJA
      alert('Wszystkie pola (nazwa, data rozpoczęcia i zakończenia) są wymagane.');
      return;
    }
    setLoading(true);
    
    // <-- POPRAWIONY INSERT: Dodajemy brakujące daty
    const { error } = await supabase
      .from('seasons')
      .insert({ 
        name: newSeasonName.trim(),
        start_date: newSeasonStartDate,
        end_date: newSeasonEndDate,
      });

    if (error) {
      alert(`Błąd tworzenia sezonu: ${error.message}`);
    } else {
      // <-- Resetujemy wszystkie pola formularza
      setNewSeasonName('');
      setNewSeasonStartDate('');
      setNewSeasonEndDate('');
      fetchSeasons();
    }
    setLoading(false);
  };
  
  const handleEndAndResetSeason = async () => {
    if (!confirm('Czy na pewno chcesz ZAKOŃCZYĆ aktywny sezon? Ta akcja zarchiwizuje wyniki, zresetuje punkty graczy i dezaktywuje sezon. Jest nieodwracalna!')) {
      return;
    }
    setLoading(true);
    const { error } = await supabase.functions.invoke('end-season-and-reset');
    
    if (error) {
        alert(`Błąd podczas resetowania sezonu: ${error.message}`);
    } else {
        alert('Sezon został pomyślnie zakończony i zresetowany!');
        fetchSeasons();
    }
    setLoading(false);
  };

  const handleActivateSeason = async (seasonId: number) => {
    if (seasons.some(s => s.is_active)) {
      alert('Inny sezon jest już aktywny. Zakończ go przed aktywacją nowego.');
      return;
    }
    if (!confirm('Czy na pewno aktywować ten sezon?')) return;
    setLoading(true);
    const { error } = await supabase
      .from('seasons')
      .update({ is_active: true })
      .eq('id', seasonId);
      
    if (error) alert(`Błąd aktywacji: ${error.message}`);
    else fetchSeasons();
    setLoading(false);
  };
  
  const handleDeleteSeason = async (seasonId: number) => {
    if (!confirm('Czy na pewno chcesz TRWALE USUNĄĆ ten sezon? Spowoduje to również usunięcie zarchiwizowanych wyników. Ta akcja jest nieodwracalna!')) {
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('seasons').delete().eq('id', seasonId);
    if (error) {
      alert(`Błąd usuwania sezonu: ${error.message}`);
    } else {
      fetchSeasons();
    }
    setLoading(false);
  };
  
  if (loading && seasons.length === 0) return <div>Ładowanie danych sezonów...</div>;

  return (
    <div>
      <h2>Zarządzanie Sezonami</h2>
      
      <div className={styles.section}>
        <h3>Stwórz Nowy Sezon</h3>
        {/* <-- POPRAWIONY FORMULARZ z dodatkowymi polami na daty */}
        <form onSubmit={handleCreateSeason} className={styles.adminForm} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', alignItems: 'end', gap: '1rem' }}>
          <div className={styles.dateInputGroup}>
            <label htmlFor="new-season-name">Nazwa Sezonu</label>
            <input 
              id="new-season-name"
              type="text" 
              placeholder="Np. Sezon Jesień 2024" 
              value={newSeasonName}
              onChange={(e) => setNewSeasonName(e.target.value)}
              required 
            />
          </div>
          <div className={styles.dateInputGroup}>
              <label htmlFor="new-start-date">Data rozpoczęcia</label>
              <input 
                  id="new-start-date"
                  type="date" 
                  value={newSeasonStartDate} 
                  onChange={(e) => setNewSeasonStartDate(e.target.value)}
                  required
              />
          </div>
          <div className={styles.dateInputGroup}>
              <label htmlFor="new-end-date">Data zakończenia</label>
              <input 
                  id="new-end-date"
                  type="date" 
                  value={newSeasonEndDate} 
                  onChange={(e) => setNewSeasonEndDate(e.target.value)}
                  required
              />
          </div>
          <button type="submit" disabled={loading} style={{ alignSelf: 'end' }}>Dodaj Sezon</button>
        </form>
      </div>

      <div className={styles.section}>
        <h3>Lista Sezonów</h3>
        <table className={styles.adminTable}>
          {/* ... reszta tabeli pozostaje bez zmian ... */}
          <thead>
            <tr>
              <th>Nazwa Sezonu</th>
              <th>Status</th>
              <th style={{width: '350px'}}>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {seasons.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>
                  {s.is_active ? 
                    <span style={{color: 'var(--success)', fontWeight: 'bold'}}>AKTYWNY</span> : 
                    'Nieaktywny'
                  }
                </td>
                <td style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {s.is_active ? (
                    <button onClick={handleEndAndResetSeason} style={{backgroundColor: 'var(--primary-hover)'}} disabled={loading}>Zakończ i Zresetuj</button>
                  ) : (
                    <button onClick={() => handleActivateSeason(s.id)} style={{backgroundColor: 'var(--success)'}} disabled={loading || seasons.some(s => s.is_active)}>Aktywuj</button>
                  )}
                  <button onClick={() => handleDeleteSeason(s.id)} disabled={loading}>Usuń</button>
                </td>
              </tr>
            ))}
            {seasons.length === 0 && (
                <tr>
                    <td colSpan={3} style={{textAlign: 'center', color: 'var(--text-muted)'}}>Brak sezonów. Stwórz pierwszy!</td>
                </tr>
            )}
          </tbody>
        </table>
        <p style={{marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
            Uwaga: Zawsze może być tylko jeden aktywny sezon. Aby aktywować nowy, najpierw zakończ obecny.
        </p>
      </div>
    </div>
  );
}