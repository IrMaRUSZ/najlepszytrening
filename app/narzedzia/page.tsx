'use client';

import React, { useState } from 'react';
import { Calculator, Scale, Dumbbell } from 'lucide-react';
import Diet from '../../components/calculators/Kalkulator-zapotrzebowania-kalorycznego';
import BodyFat from '../../components/calculators/bodyfat';
import OneRepMax from '../../components/calculators/onerepmax';
import styles from '../../styles/narzedzia.module.css';

const ToolsPage = () => {
  const [activeCalculator, setActiveCalculator] = useState('diet');

  const tools = [
    {
      id: 'diet',
      name: 'Kalkulator Diety',
      icon: Calculator,
      description: 'Oblicz swoje zapotrzebowanie kaloryczne i makroskładniki'
    },
    {
      id: 'bodyfat',
      name: 'Kalkulator Tkanki Tłuszczowej',
      icon: Scale,
      description: 'Oblicz swój poziom tkanki tłuszczowej'
    },
    {
      id: 'onerepmax',
      name: 'Kalkulator 1RM',
      icon: Dumbbell,
      description: 'Oblicz swoje maksymalne obciążenie'
    }
  ];

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'diet':
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Kalkulatory treningowe</h1>
        <p>Wybierz narzędzie, które pomoże Ci w osiągnięciu Twoich celów</p>
      </div>

      <div className={styles.tools}>
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              className={`${styles.toolButton} ${activeCalculator === tool.id ? styles.active : ''}`}
              onClick={() => setActiveCalculator(tool.id)}
            >
              <Icon className={styles.toolIcon} />
              <div className={styles.toolInfo}>
                <span className={styles.toolName}>{tool.name}</span>
                <span className={styles.toolDescription}>{tool.description}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className={styles.calculatorWrapper}>
        {renderCalculator()}
      </div>
    </div>
  );
};

export default ToolsPage;