// app/page.tsx
import Image from 'next/image'
import { Instagram, Youtube, CalendarCheck, MapPin, Star, ClipboardCheck, ShieldCheck } from 'lucide-react'
import styles from '../styles/Home.module.css'
import { TrustBuildingSection } from '../components/Home/TrustBuildingSection';
import InitialHook from '../components/Home/InitialHook';
import StepSection from '../components/Home/StepsSection';
import BlogPage from './blog/page'
import { Metadata } from 'next';
import CalendlyCTA from '../components/CalendlyCTA';

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
            Trening personalny w Łodzi prowadzony przez fizjoterapeutę
          </h1>
          
          <p className={styles.subtitle}>
            Pomagam poprawić sylwetkę, bezpiecznie rozpocząć trening i wrócić do aktywności
            {' '}po kontuzji także osobom z bólem, ograniczeniami ruchowymi lub obawą przed siłownią.
            Najpierw poznaję Twój problem, potem tworzę rozwiązanie dopasowane do Ciebie.
          </p>

          <div className={styles.calendlyLinkContainer}>
            <CalendlyCTA
              ctaSource="home_hero"
              serviceType="general"
              ctaLabel="Umów bezpłatną konsultację online"
              className={`${styles.funnelBtn} ${styles.funnelBtnPrimary} ${styles.calendlyCta}`}
            >
              <CalendarCheck size={22} className={styles.calendlyIcon} />
              <span>Umów bezpłatną konsultację online</span>
            </CalendlyCTA>
            <p className={styles.calendlyHint}>
              15 minut online · bez zobowiązań · poznaję Twój cel i odpowiadam na pytania
            </p>
          </div>

          {/* Nowe karty atutów (spójne ze screenem nr 2) */}
          <div className={styles.uspGrid}>
            <div className={styles.uspCard}>
              <ClipboardCheck className={styles.uspIcon} size={24} />
              <p className={styles.uspText}>
                <strong>Analiza problemu.</strong> Rozmawiamy o Twoim celu, możliwościach i dotychczasowych trudnościach.
              </p>
            </div>
            <div className={styles.uspCard}>
              <ShieldCheck className={styles.uspIcon} size={24} />
              <p className={styles.uspText}>
                <strong>Indywidualny i bezpieczny plan.</strong> Ćwiczenia dobieram do Twojego celu, sprawności i ograniczeń.
              </p>
            </div>
            <div className={styles.uspCard}>
              <MapPin className={styles.uspIcon} size={24} />
              <p className={styles.uspText}>
                <strong>Stała opieka i kontrola.</strong> Wyjaśniam ćwiczenia, monitoruję postępy i modyfikuję plan.
              </p>
            </div>
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

      <section className={styles.quickProofSection} aria-labelledby="quick-proof-title">
        <div className={styles.quickProofHeader}>
          <span className={styles.quickProofEyebrow}>Prawdziwe historie podopiecznych</span>
          <h2 id="quick-proof-title">Bezpieczny proces dopasowany do człowieka, nie do schematu</h2>
        </div>
        <div className={styles.quickProofGrid}>
          <article className={styles.quickProofCard}>
            <span className={styles.quickProofLabel}>Powrót po ACL</span>
            <blockquote>
              „Trafiłam do niego z polecenia, 4 miesięce po rekonstrukcji więzadła krzyżowego przedniego, szukając pomocy w bezpiecznym odbudowaniu mięśni i przezwyciężeniu strachu przed pełnym obciążaniem operowanej nogi.”
            </blockquote>
            <strong>Basia</strong>
          </article>
          <article className={styles.quickProofCard}>
            <span className={styles.quickProofLabel}>Trening mimo ograniczeń</span>
            <blockquote>
              „Ma dużą wiedzę, potrafi ułożyć taki plan treningu, który bez problemu można wykonywać i realnie poprawia siłę.”
            </blockquote>
            <strong>Paweł, podopieczny poruszający się na wózku</strong>
          </article>
          <article className={styles.quickProofCard}>
            <span className={styles.quickProofLabel}>Trening, który nie jest obowiązkiem</span>
            <blockquote>
              „Dzięki tej współpracy polubiłem treningi na siłowni i przestały być one tylko obowiązkiem do odhaczenia.”
            </blockquote>
            <strong>Przemek</strong>
          </article>
        </div>
        <div className={styles.quickProofAction}>
          <p>Nie musisz wiedzieć, od czego zacząć. Opowiedz mi o swoim celu.</p>
          <CalendlyCTA
            ctaSource="home_quick_proof"
            serviceType="general"
            ctaLabel="Umów bezpłatną konsultację online"
            className={`${styles.funnelBtn} ${styles.funnelBtnPrimary} ${styles.quickProofButton}`}
          >
            <CalendarCheck size={22} />
            <span>Umów bezpłatną konsultację online</span>
          </CalendlyCTA>
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
    </main>
  )
}
