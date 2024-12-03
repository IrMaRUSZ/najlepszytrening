'use client';

import styles from '../../styles/HomeAntidotum.module.css';
import { MapPin, Phone, Mail, ArrowRight} from 'lucide-react';
import { useState } from 'react';



export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Wystąpił błąd podczas wysyłania wiadomości');
      }

      alert('Wiadomość została wysłana pomyślnie!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Wystąpił błąd podczas wysyłania wiadomości');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero} style={{ height: '60vh' }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroTextContainer}>
            <h1 className={styles.heroTitle}>Kontakt</h1>
            <p className={styles.heroSubtitle}>Zacznij swoją transformację już dziś</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contact}>
        <div className={styles.contactContainer}>
          <div className={styles.contactInfo}>
            <div className={styles.contactCard}>
              <MapPin className={styles.contactIcon} />
              <h3>Lokalizacja</h3>
              <p>ul. Dąbrowskiego 207/225<br />93-231 Łódź</p>
              <a 
                href="https://maps.google.com/?q=Dąbrowskiego+207/225+Łódź" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.directionLink}
              >
                Sprawdź dojazd
                <ArrowRight size={16} />
              </a>
            </div>
            <div className={styles.contactCard}>
              <Phone className={styles.contactIcon} />
              <h3>Telefon</h3>
              <a href="tel:+48737730868" className={styles.contactLink}>+48 737 730 868</a>
            </div>
            <div className={styles.contactCard}>
              <Mail className={styles.contactIcon} />
              <h3>Email</h3>
              <a href="mailto:maruszewskiirek@gmail.com" className={styles.contactLink}>
                maruszewskiirek@gmail.com
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Imię"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Twoja wiadomość - napisz z jakiej dzielnicy jesteś i jakie masz cele treningowe"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
              <ArrowRight size={20} className={styles.buttonIcon} />
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.8089760952244!2d19.4774885!3d51.7505145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471a35833ba9d6f1%3A0x5a7620a7a8983a5d!2zRMSFYnJvd3NraWVnbyAyMDcvMjI1LCA5My0yMzEgxYHDs2TFug!5e0!3m2!1spl!2spl!4v1708977562488!5m2!1spl!2spl"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '20px' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
}