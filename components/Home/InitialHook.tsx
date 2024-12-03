'use client';

import React, { useEffect, useRef } from 'react';
import { Scale, Clock, CircleDollarSign, ChevronRight } from 'lucide-react';
import styles from '../../styles/InitialHook.module.css'

const InitialHook = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    sectionRef.current?.classList.add(styles.visible);
                    observer.disconnect(); // Odpinamy observer po pierwszym pokazaniu
                }
            },
            {
                threshold: 0.2 // Sekcja zacznie się animować gdy 20% będzie widoczne
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const scrollToTransformacje = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('transformacje');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
    };

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Zastanawiasz się dlaczego Twoje poprzednie próby nie działały?
                </h2>
                
                <div className={styles.grid}>
                    <div className={styles.problemsContainer}>
                        <div className={styles.problemCard}>
                            <div className={styles.cardHeader}>
                                <Scale className={styles.icon} />
                                <h3 className={styles.cardTitle}>Problem z utrzymaniem wagi?</h3>
                            </div>
                            <p className={styles.cardText}>
                                Schudnięcie to dopiero połowa sukcesu. 
                                <span className={styles.highlight}> Większość osób wraca do początkowej wagi</span> po typowej diecie.
                            </p>
                        </div>

                        <div className={styles.problemCard}>
                            <div className={styles.cardHeader}>
                                <Clock className={styles.icon} />
                                <h3 className={styles.cardTitle}>Brak czasu na treningi?</h3>
                            </div>
                            <p className={styles.cardText}>
                                Typowy trening to 2h na siłowni. U mnie? 
                                <span className={styles.highlight}> 45-60 minut intensywnej pracy</span>. Zero marnowania czasu.
                            </p>
                        </div>

                        <div className={styles.problemCard}>
                            <div className={styles.cardHeader}>
                                <CircleDollarSign className={styles.icon} />
                                <h3 className={styles.cardTitle}>Drogie suplementy?</h3>
                            </div>
                            <p className={styles.cardText}>
                                Zapomnij o wydawaniu fortuny na cudowne suplementy. 
                                <span className={styles.highlight}> Skupiamy się na zbilansowanej diecie</span> z normalnych produktów.
                            </p>
                        </div>
                    </div>
                    
                    <div className={styles.solutionsCard}>
                        <h3 className={styles.solutionsTitle}>
                            Moje podejście jest inne:
                        </h3>
                        <div className={styles.solutionsList}>
                            {[
                                {
                                    title: "Zero restrykcyjnych diet",
                                    description: "Uczę jak komponować posiłki, które dają energię i pomagają lepiej się czuć"
                                },
                                {
                                    title: "Treningi dopasowane do Ciebie",
                                    description: "Plan uwzględnia Twój grafik, poziom zaawansowania i cele"
                                },
                                {
                                    title: "Wsparcie przez 24/7",
                                    description: "Masz pytanie? Napisz. Średni czas odpowiedzi to 30 minut"
                                },
                                {
                                    title: "Realne podejście",
                                    description: "Wyjście ze znajomymi? Święta? Nauczysz się, jak sobie z tym radzić"
                                }
                            ].map((item, index) => (
                                <div key={index} className={styles.solutionItem}>
                                    <ChevronRight className={styles.solutionIcon} />
                                    <div className={styles.solutionContent}>
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.nextSection}>
                    <button 
                        onClick={scrollToTransformacje}
                        className={styles.nextSectionLink}
                    >
                        Zobacz transformacje moich podopiecznych
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InitialHook;