// app/page.tsx
import Image from 'next/image'
import { MapPin, Globe, Instagram, Youtube } from 'lucide-react'
import styles from '../styles/Home.module.css'
import { TrustBuildingSection } from '../components/Home/TrustBuildingSection';
import InitialHook from '../components/Home/InitialHook';
import StepSection from '../components/Home/StepsSection';
import BlogPage from './blog/page'
import CookiePopup from '../components/CookiePopup';

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
            Ireneusz
            <span className={styles.titleSecondLine}>Maruszewski</span>
          </h1>
          <p className={styles.subtitle}>
            Trener personaly Łódź
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
          <a href="https://calendly.com/maruszewskiirek" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
            Umów Darmową Konsultację w Łodzi
            <span className={styles.arrow}>→</span>
          </a>
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