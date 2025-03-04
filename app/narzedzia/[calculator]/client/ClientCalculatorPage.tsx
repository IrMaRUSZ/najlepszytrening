'use client';

import React from 'react';
import Diet from '../../../../components/calculators/Kalkulator-zapotrzebowania-kalorycznego';
import BodyFat from '../../../../components/calculators/bodyfat';
import OneRepMax from '../../../../components/calculators/onerepmax';
import BMI from '../../../../components/calculators/bmi';
import styles from '../../../../styles/narzedzia.module.css';

// Przyjmujemy calculator jako prop bezpośrednio z komponentu nadrzędnego
const ClientCalculatorPage = ({ calculator }) => {
  const getTitle = () => {
    switch (calculator) {
      case 'Kalkulator-zapotrzebowania-kalorycznego':
        return 'Kalkulator Zapotrzebowania Kalorycznego';
      case 'bodyfat':
        return 'Kalkulator Tkanki Tłuszczowej';
      case 'onerepmax':
        return 'Kalkulator Maksymalnego Ciężaru';
      case 'bmi':
        return 'Kalkulator BMI';
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
      case 'bmi':
        return <BMI />;
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

export default ClientCalculatorPage;