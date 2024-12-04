'use client';

import { useParams, notFound } from 'next/navigation';
import Diet from '../../../components/calculators/Kalkulator-zapotrzebowania-kalorycznego';
import BodyFat from '../../../components/calculators/bodyfat';
import OneRepMax from '../../../components/calculators/onerepmax';
import styles from '../../../styles/narzedzia.module.css';

const validCalculators = ['Kalkulator-zapotrzebowania-kalorycznego', 'bodyfat', 'onerepmax'];

const CalculatorPage = () => {
  const params = useParams();
  const calculator = params.calculator as string;

  // Sprawdzamy czy ścieżka jest dokładnie taka jak oczekujemy
  if (!validCalculators.includes(calculator)) {
    notFound();
  }

  const getTitle = () => {
    switch (calculator) {
      case 'Kalkulator-zapotrzebowania-kalorycznego':
        return '';
      case 'bodyfat':
        return '';
      case 'onerepmax':
        return 'Kalkulator 1RM';
      default:
        return '';
    }
  };

  const renderCalculator = () => {
    switch (calculator) {
      case 'Kalkulator-zapotrzebowania-kalorycznego':
        return <Diet />;
      case 'bodyfat':
        return <BodyFat />;
      case 'onerepmax':
        return <OneRepMax />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{getTitle()}</h1>
      </div>
      <div className={styles.calculatorWrapper}>
        {renderCalculator()}
      </div>
    </div>
  );
};

export default CalculatorPage;