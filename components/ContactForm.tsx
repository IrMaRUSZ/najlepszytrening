'use client';

import { useState } from 'react';
import styles from '../styles/ContactForm.module.css';

const ContactModal = ({ buttonText = "Zacznij działać" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contactMethod: 'email',
    contactDetails: '',
    goal: 'redukcja',
    customMessage: '',
    dataProcessingConsent: false, // Zgoda RODO - obowiązkowa
    marketingConsent: false       // Zgoda marketingowa - opcjonalna
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Dla checkboxów używamy wartości "checked" zamiast "value"
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Sprawdź czy zgoda RODO jest zaznaczona
    if (!formData.dataProcessingConsent) {
      setError('Wymagana jest zgoda na przetwarzanie danych osobowych.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Przygotowanie danych
    const messageMap = {
      'redukcja': 'Chcę schudnąć.',
      'masa': 'Interesuje mnie zbudowanie masy mięśniowej.',
      'plecy': 'Mam problemy z plecami.',
      'plan': 'Potrzebuję planu treningowego.',
      'custom': formData.customMessage
    };
    
    const finalMessage = messageMap[formData.goal];
    
    try {
      // Sprawdź, czy endpoint istnieje przed wysłaniem
      const testEndpoint = await fetch('/api/ping', { method: 'HEAD' })
        .then(res => res.ok)
        .catch(() => false);
      
      // Jeśli endpoint nie istnieje lub jest niedostępny, symulujemy sukces
      // W środowisku produkcyjnym należy to zastąpić faktycznym wysyłaniem
      if (!testEndpoint) {
        // Symulacja opóźnienia
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Symulacja sukcesu (tylko do celów demo)
        console.log('Dane formularza (symulacja):', {
          ...formData,
          message: finalMessage
        });
        
        setSubmitted(true);
      } else {
        // Jeśli endpoint istnieje, używamy go
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            message: finalMessage
          }),
        });
        
        if (!response.ok) {
          throw new Error('Problem z wysłaniem formularza. Spróbuj ponownie.');
        }
        
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Problem z wysłaniem formularza. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  };
  
  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
    
    // Reset formularza po zamknięciu
    if (!isSubmitting) {
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          contactMethod: 'email',
          contactDetails: '',
          goal: 'redukcja',
          customMessage: '',
          dataProcessingConsent: false,
          marketingConsent: false
        });
        setSubmitted(false);
        setError('');
      }, 300);
    }
  };
  
  // Zatrzymaj propagację kliknięcia
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  
  return (
    <>
      <button onClick={openModal} className={styles.mainButton}>
        {buttonText} <span className={styles.arrow}>→</span>
      </button>
      
      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={stopPropagation}>
            <button className={styles.closeButton} onClick={closeModal} type="button" aria-label="Zamknij">×</button>
            
            {submitted ? (
              <div className={styles.success}>
                <h3>Dziękuję za wiadomość!</h3>
                <p>Odezwę się do Ciebie najszybciej jak to możliwe.</p>
                <button 
                  onClick={closeModal}
                  className={styles.submitButton}
                  type="button"
                >
                  Zamknij
                </button>
              </div>
            ) : (
              <>
                <h3 className={styles.formTitle}>Umów darmową konsultację</h3>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Twoje imię"
                      className={styles.input}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Telefon (wymagany)"
                      className={styles.input}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <div className={styles.contactRow}>
                      <select
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="email">Email</option>
                        <option value="instagram">Instagram</option>
                        <option value="messenger">Messenger</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                      
                      <input
                        type="text"
                        name="contactDetails"
                        value={formData.contactDetails}
                        onChange={handleChange}
                        placeholder="Dodatkowy kontakt"
                        className={styles.input}
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.goalLabel}>Wybierz cel:</label>
                    <div className={styles.goalButtons}>
                      {[
                        { id: 'redukcja', text: 'Chcę schudnąć' },
                        { id: 'masa', text: 'Budowa masy' },
                        { id: 'plecy', text: 'Problem z plecami' },
                        { id: 'plan', text: 'Potrzebuję planu treningowego' },
                        { id: 'custom', text: 'Inna wiadomość' }
                      ].map(item => (
                        <button 
                          key={item.id}
                          type="button" 
                          onClick={() => setFormData(prev => ({...prev, goal: item.id}))}
                          className={`${styles.goalButton} ${formData.goal === item.id ? styles.active : ''}`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {formData.goal === 'custom' && (
                    <div className={styles.formGroup}>
                      <textarea
                        name="customMessage"
                        value={formData.customMessage}
                        onChange={handleChange}
                        placeholder="Opisz swój cel lub problem"
                        className={styles.textarea}
                        rows={3}
                        required={formData.goal === 'custom'}
                      />
                    </div>
                  )}
                  
                  {/* Sekcja zgód RODO - bardziej zwięzła */}
                  <div className={styles.consentSection}>
                    <div className={styles.consentItem}>
                      <input
                        type="checkbox"
                        id="dataProcessingConsent"
                        name="dataProcessingConsent"
                        checked={formData.dataProcessingConsent}
                        onChange={handleChange}
                        className={styles.checkbox}
                        required
                      />
                      <label htmlFor="dataProcessingConsent" className={styles.consentLabel}>
                        * Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji usługi zgodnie z RODO.
                      </label>
                    </div>
                    
                    <div className={styles.consentItem}>
                      <input
                        type="checkbox"
                        id="marketingConsent"
                        name="marketingConsent"
                        checked={formData.marketingConsent}
                        onChange={handleChange}
                        className={styles.checkbox}
                      />
                      <label htmlFor="marketingConsent" className={styles.consentLabel}>
                        Zgadzam się na otrzymywanie informacji marketingowych.
                      </label>
                    </div>
                    
                    <div className={styles.privacyPolicy}>
                      <a href="/prywatnosc" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>
                        Polityka prywatności
                      </a>
                    </div>
                  </div>
                  
                  {error && <div className={styles.errorMessage}>{error}</div>}
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;