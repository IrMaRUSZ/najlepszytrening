// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Youtube, CalendarCheck, MapPin, Smartphone, Star, Clock, Shield } from 'lucide-react'
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
  description: 'Ból pleców, brak energii po pracy, ciało które odmawia posłuszeństwa? Trener personalny i fizjoterapeuta w Łodzi. Ponad 51 opinii ⭐. Pierwsza konsultacja 0 zł.',
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
        alt: 'Ireneusz Maruszewski Trener Personalny Łódź',
      },
    ],
  },
};

export default function Home() {
  return (
    <main className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsActivityLocation",
            "name": "Ireneusz Maruszewski, Trener Personalny Łódź",
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
            alt="Ireneusz Maruszewski Trener Personalny i Fizjoterapeuta Łódź"
            width={600}
            height={800}
            className={styles.trainerImage}
            priority
          />
          <div className={styles.physioBadge}>
            <span>Fizjoterapeuta + Trener</span>
          </div>
        </div>
        
        <div className={styles.leftContent}>
          <div className={styles.heroProof}>
            <div className={styles.heroStars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} fill="#fca311" color="#fca311" />
              ))}
            </div>
            <span className={styles.heroProofText}>51 opinii w Łodzi i online</span>
          </div>

          <h1 className={styles.title}>
            Boli Cię kręgosłup<br/>
            <span className={styles.titleSub}>
              od siedzenia przy biurku?
            </span>
          </h1>
          
          <p className={styles.subtitle}>
            Jako fizjoterapeuta i trener wiem dlaczego boli oraz wiem jak to naprawić. 
            Pracuję z programistami, lekarzami i managerami. Pomagam odzyskać sprawne ciało 
            bez spędzania połowy życia na siłowni.
          </p>

          {/* Nowe karty atutów (spójne ze screenem nr 2) */}
          <div className={styles.uspGrid}>
            <div className={styles.uspCard}>
              <Clock className={styles.uspIcon} size={24} />
              <p className={styles.uspText}>
                <strong>Krótkie treningi.</strong> Od 45 do 60 minut intensywnej pracy. Zero marnowania czasu.
              </p>
            </div>
            <div className={styles.uspCard}>
              <Shield className={styles.uspIcon} size={24} />
              <p className={styles.uspText}>
                <strong>Fizjoterapeutyczne podejście.</strong> Główny nacisk kładziemy na zniwelowanie bólu.
              </p>
            </div>
            <div className={styles.uspCard}>
              <MapPin className={styles.uspIcon} size={24} />
              <p className={styles.uspText}>
                <strong>Trenuj tam gdzie Ci wygodnie.</strong> Widzew, Centrum, Just Gym lub prowadzenie online.
              </p>
            </div>
          </div>

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
              <CalendarCheck size={28} className={styles.calendlyIcon} />
              <span className={styles.calendlyText}>Wybierz termin darmowej konsultacji</span>
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