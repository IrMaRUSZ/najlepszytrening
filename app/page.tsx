// app/page.tsx
import Image from 'next/image'
import { MapPin, Globe, Instagram, Youtube } from 'lucide-react'
import styles from '../styles/Home.module.css'
import { TrustBuildingSection } from '../components/Home/TrustBuildingSection';
import InitialHook from '../components/Home/InitialHook';
import StepSection from '../components/Home/StepsSection';
import BlogPage from './blog/page'
import CookiePopup from '../components/CookiePopup';
import { Metadata } from 'next';
import ContactForm from '../components/ContactForm';


export const metadata: Metadata = {
  title: 'Trener Personalny Łódź',
  description: 'Chcesz schudnąć, zbudować mięśnie lub po prostu czuć się lepiej w swoim ciele? Pomogę Ci to osiągnąć! Jako trener personalny w Łodzi dopasuję trening do Twoich potrzeb i stylu życia.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Trener Personalny Łódź | Najlepszy Trening',
    description: 'Chcesz schudnąć, zbudować mięśnie lub po prostu czuć się lepiej w swoim ciele? Pomogę Ci to osiągnąć!',
  },
};
export default function Home() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.imageContainer}> 
          <Image
            src="/images/Maruszewskibt.webp"
            alt="Ireneusz Maruszewski - Trener Personalny Łódź"
            width={600}
            height={800}
            className={styles.trainerImage}
          />
        </div>
        <div className={styles.leftContent}>
          <h1 className={styles.title}>
          Trener Personaly Łódź
          </h1>
          <p className={styles.subtitle}>
            Ireneusz Maruszewski
          </p>
          <div className={styles.badges}>
            <button className={styles.badge}>
              <MapPin size={20} />
              Trening personaly Łódź Dąbrowa
            </button>
            <button className={styles.badge}>
              <Globe size={20} />
              Trener online
            </button>
          </div>
          <div className={styles.contactSection}>
  <ContactForm />
</div>
          <div className={styles.socialLinks}>
            <a href="https://instagram.com/trener_ireneusz" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <Instagram size={24} />
            </a>
            <a href="https://youtube.com/@najlepszytrening" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <Youtube size={24} />
            </a>
          </div>
        </div>
      </section>
      <InitialHook />
      <TrustBuildingSection />
      <StepSection/>
      <section className={styles.blogSection}>
        <BlogPage />
      </section>
      <CookiePopup />
    </main>
  )
}