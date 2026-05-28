// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import {Instagram, Youtube, CalendarCheck, MapPin, Smartphone } from 'lucide-react'
import styles from '../styles/Home.module.css'
import { TrustBuildingSection } from '../components/Home/TrustBuildingSection';
import InitialHook from '../components/Home/InitialHook';
import StepSection from '../components/Home/StepsSection';
import BlogPage from './blog/page'
import CookiePopup from '../components/CookiePopup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Trener Personalny Łódź | Ireneusz Maruszewski | Fizjoterapeuta',
  },
  description: 'Trener personalny i fizjoterapeuta w Łodzi – Ireneusz Maruszewski. Treningi w Just Gym (Gojawiczyńska), Widzew, Centrum i online. Ponad 51 opinii ⭐. Pierwsza konsultacja 0 zł.',
  alternates: {
    canonical: 'https://www.najlepszytrening.pl',
  },
  openGraph: {
    title: 'Trener Personalny Łódź | Ireneusz Maruszewski',
    description: 'Trener personalny z wykształceniem fizjoterapeuty. Treningi w Łodzi i online. Darmowa konsultacja.',
    url: 'https://www.najlepszytrening.pl',
    type: 'website',
    images: [
      {
        url: '/images/Maruszewskibt.webp',
        width: 1200,
        height: 630,
        alt: 'Ireneusz Maruszewski - Trener Personalny Łódź',
      },
    ],
  },
};

export default function Home() {
  return (
    <main className={styles.container}>
      {/* Schema.org LocalBusiness z gwiazdkami */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "name": "Ireneusz Maruszewski - Trener Personalny Łódź",
      "image": "https://www.najlepszytrening.pl/images/Maruszewskibt.webp",
      "@id": "https://www.najlepszytrening.pl",
      "url": "https://www.najlepszytrening.pl",
      "telephone": "+48737730868",
      "email": "maruszewskiirek@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ul. Poli Gojawiczyńskiej 26",
        "addressLocality": "Łódź",
        "postalCode": "93-239",
        "addressCountry": "PL"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "51"
      },
      "priceRange": "$$"
    })
  }}
/>
      <section className={styles.hero}>
        <div className={styles.imageContainer}> 
          <Image
            src="/images/Maruszewskibt.webp"
            alt="Ireneusz Maruszewski - Trener Personalny i Fizjoterapeuta Łódź"
            width={600}
            height={800}
            className={styles.trainerImage}
            priority
          />
        </div>
        <div className={styles.leftContent}>
          
<h1 className={styles.title}>
  Trener Personalny Łódź<br/>
  <span className={styles.titleSub}>
    Trenuj mądrze. Bez bólu i wymówek.
  </span>
</h1>
          
          <p className={styles.subtitle}>
            Łączę medyczną wiedzę z efektywnym treningiem siłowym. 
            Pomagam osobom po kontuzjach i zapracowanym odzyskać sprawność. 
            Wybierz, jak chcesz ze mną współpracować:
          </p>

          {/* CRO: Split Funnel - Rozwidlenie na Łódź i Online */}
          <div className={styles.splitFunnel}>
            <Link href="/trener-personalny-lodz" className={`${styles.funnelBtn} ${styles.funnelBtnPrimary}`}>
              <MapPin size={20} />
              Współpraca w Łodzi
            </Link>
            
            <Link href="/Wspolpraca-online" className={`${styles.funnelBtn} ${styles.funnelBtnSecondary}`}>
              <Smartphone size={20} />
              Prowadzenie Online
            </Link>
          </div>

          {/* CRO: Bezpośrednie przejście do konsultacji bez bariery formularza */}
          <div className={styles.calendlyLinkContainer}>
            <p className={styles.calendlyHint}>
              Nie wiesz co wybrać? Zacznijmy od darmowej diagnozy.
            </p>
            <a 
              href="https://calendly.com/maruszewskiirek" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.calendlyLink}
            >
              <CalendarCheck size={24} />
              Wybierz termin darmowej konsultacji
            </a>
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
      
      {/* CRO: Przenosimy bloga niżej i dajemy mu mniejszy priorytet wizualny */}
      <section className={styles.blogSection}>
        <div className={styles.blogHeader}>
          <h2>Baza wiedzy z zakresu fizjoterapii i treningu</h2>
        </div>
        <BlogPage />
      </section>
      <CookiePopup />
    </main>
  )
}