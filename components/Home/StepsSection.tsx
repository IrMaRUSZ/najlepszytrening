'use client';

import React, { useRef, useEffect } from 'react';
import { Calendar, Dumbbell, LineChart, MessageCircle } from 'lucide-react';
import styles from '../../styles/StepsSection.module.css';

const StepsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    sectionRef.current?.classList.add(styles.visible);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Jak wygląda współpraca?
                </h2>

                <div className={styles.stepsGrid}>
                    {[
                        {
                            icon: <Calendar />,
                            title: "1. Bezpłatna konsultacja",
                            description: "Poznajemy się, wykonujemy pomiary i ustalamy plan działania dopasowany do Twoich celów."
                        },
                        {
                            icon: <Dumbbell />,
                            title: "2. Kompletny pakiet startowy",
                            description: "Otrzymujesz wszystkie narzędzia potrzebne do rozpoczęcia transformacji:",
                            details: [
                                "Spersonalizowany plan treningowy z filmami instruktażowymi",
                                "7-dniowy jadłospis z przepisami i listą zakupów",
                                "Kalkulator kalorii i aplikację do śledzenia postępów",
                                "Instrukcję krok po kroku jak przygotować się do treningu",
                                "Checklistę produktów do wprowadzenia do diety"
                            ]
                        },
                        {
                            icon: <LineChart />,
                            title: "3. Monitorowanie postępów",
                            description: "Co tydzień sprawdzamy postępy i dostosowujemy plan do Twoich wyników."
                        },
                        {
                            icon: <MessageCircle />,
                            title: "4. Stały kontakt",
                            description: "Masz pytanie? Wątpliwości? Jestem dostępny przez WhatsApp lub telefon."
                        }
                    ].map((step, index) => (
                        <div key={index} className={styles.stepCard}>
                            <div className={styles.iconWrapper}>
                                {step.icon}
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                            {step.details && (
                                <ul>
                                    {step.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.ctaSection}>
                    <h3>Gotowy na zmiany?</h3>
                    <p>Umów się na darmową konsultację i przekonaj się, że tym razem może być inaczej</p>
                    <a 
                        href="https://calendly.com/maruszewskiirek" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctaButton}
                    >
                        Zarezerwuj termin konsultacji
                    </a>
                    <span className={styles.guarantee}>
                        Jeśli po konsultacji stwierdzisz, że to nie dla Ciebie - nie płacisz nic
                    </span>
                </div>
            </div>
        </section>
    );
};

export default StepsSection;