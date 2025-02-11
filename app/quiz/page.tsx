'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Award } from 'lucide-react';
import styles from '../../styles/quiz.module.css';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QuizComponent: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const quizQuestion: QuizQuestion = {
    question: 'Który makroskładnik dostarcza najwięcej energii na gram?',
    options: ['Białko', 'Tłuszcze', 'Węglowodany', 'Błonnik'],
    correct: 1,
    explanation: 'Tłuszcze dostarczają 9 kcal na gram, podczas gdy białko i węglowodany po 4 kcal.'
  };

  const handleAnswerClick = (index: number): void => {
    setSelectedAnswer(index);
    setIsCorrect(index === quizQuestion.correct);
    setTimeout(() => setShowExplanation(true), 800);
  };

  // Animacja dla kontenera
  const containerAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  // Animacja dla wyjaśnienia
  const explanationAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizCard}>
        <motion.div
          {...containerAnimation}
          className={styles.contentContainer}
        >
          <h2 className={styles.question}>
            {quizQuestion.question}
          </h2>

          <div className={styles.optionsContainer}>
            {quizQuestion.options.map((option: string, index: number) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                className={`${styles.optionButton} ${
                  selectedAnswer !== null && index === quizQuestion.correct
                    ? styles.correct
                    : selectedAnswer === index
                    ? styles.incorrect
                    : selectedAnswer !== null
                    ? styles.disabled
                    : ''
                }`}
                whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
              >
                <span>{option}</span>
                {selectedAnswer !== null && index === quizQuestion.correct && (
                  <Check className={styles.checkIcon} size={24} />
                )}
                {selectedAnswer === index && index !== quizQuestion.correct && (
                  <X className={styles.xIcon} size={24} />
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                {...explanationAnimation}
              >
                <div className={`${styles.explanationCard} ${
                  isCorrect ? styles.correct : styles.incorrect
                }`}>
                  {isCorrect && (
                    <div className={styles.awardContainer}>
                      <Award className={styles.checkIcon} size={32} />
                    </div>
                  )}
                  <p>{quizQuestion.explanation}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizComponent;