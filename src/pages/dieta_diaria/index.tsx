import React from 'react';
import {
  FaTint, // Gota de água
  FaFireAlt, // Fogo para calorias
  FaUtensils, // Garfo e faca para refeições
  FaCheckCircle, // Ícone de check
  FaSun, // Café da manhã
  FaDrumstickBite, // Almoço (exemplo)
  FaAppleAlt, // Lanche (exemplo)
  FaMoon // Jantar
} from 'react-icons/fa';
import styles from './dieta_diaria.module.css';

const dieta_diaria: React.FC = () => {
  // Dados mockados
  const waterGoal = { current: 1.5, target: 2.5 };
  const calories = { current: 1250, target: 2000 };
  const meals = { current: 3, target: 5 };

  const dietPlan = [
    {
      id: '1',
      time: '07:00 Hrs',
      title: 'Café da manhã',
      description: 'Aveia com frutas, yogurt',
      icon: FaSun,
      completed: true,
    },
    {
      id: '2',
      time: '12:30 Hrs',
      title: 'Almoço',
      description: 'Frango grelhado, quinoa e vegetais',
      icon: FaDrumstickBite,
      completed: true,
    },
    {
      id: '3',
      time: '15:30 Hrs',
      title: 'Lanche',
      description: 'Nozes e salada de frutas',
      icon: FaAppleAlt,
      completed: true,
    },
    {
      id: '4',
      time: '19:00 Hrs',
      title: 'Jantar',
      description: 'Salmão com batata doce, salada',
      icon: FaMoon,
      completed: false, // Este é o item a ser marcado
    },
  ];

  // Função mock para marcar como completo (seria um setState em uma aplicação real)
  const handleMarkAsComplete = (id: string) => {
    console.log(`Refeição ${id} marcada como completa!`);
    // Em um app real: setDietPlan para atualizar o estado
  };

  return (
    <div className={styles.pageContainer}>
      {/* Assumindo que o cabeçalho Iron Track está em outro componente ou será adicionado aqui */}
      {/* Um placeholder para o cabeçalho, similar aos exemplos anteriores */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          
          <span className={styles.headerLogoText}>Iron Track</span>
        </div>
        <nav className={styles.headerNav}>
          <ul>
            <li>Dashboard</li>
            <li>Treinos</li>
            <li className={styles.activeLink}>Dieta</li> {/* Exemplo de link ativo */}
            <li>Perfil</li>
          </ul>
        </nav>
        <div className={styles.headerRight}>
          
          <div className={styles.headerAvatarPlaceholder}></div>
          <div className={styles.headerOtherAvatar}></div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <h1 className={styles.sectionTitle}>Minha dieta diária</h1>

        <div className={styles.summaryCards}>
          {/* Card Meta de água */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaTint className={styles.cardIconWater} />
              <span className={styles.cardTitle}>Meta de água</span>
            </div>
            <p className={styles.cardValue}>{waterGoal.current}L <span className={styles.cardTarget}>/ {waterGoal.target}L meta</span></p>
            <div className={styles.progressBarBackground}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${(waterGoal.current / waterGoal.target) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Card Calorias */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaFireAlt className={styles.cardIconCalories} />
              <span className={styles.cardTitle}>Calorias</span>
            </div>
            <p className={styles.cardValue}>{calories.current} <span className={styles.cardTarget}>/ {calories.target} kcal</span></p>
            <div className={styles.progressBarBackground}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${(calories.current / calories.target) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Card Refeições hoje */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaUtensils className={styles.cardIconMeals} />
              <span className={styles.cardTitle}>Refeições hoje</span>
            </div>
            <p className={styles.cardValue}>{meals.current} <span className={styles.cardTarget}>/ {meals.target} refeições</span></p>
            <div className={styles.progressBarBackground}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${(meals.current / meals.target) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Dieta de hoje</h2>

        <div className={styles.dietList}>
          {dietPlan.map((meal) => (
            <div key={meal.id} className={styles.mealItem}>
              <div className={styles.mealLeft}>
                <div className={styles.mealIconWrapper}>
                  {React.createElement(meal.icon, { className: styles.mealIcon })}
                  <span className={styles.mealTime}>{meal.time}</span>
                </div>
                <div className={styles.mealDetails}>
                  <p className={styles.mealTitle}>{meal.title}</p>
                  <p className={styles.mealDescription}>{meal.description}</p>
                </div>
              </div>
              <div className={styles.mealRight}>
                {meal.completed ? (
                  <span className={styles.completedStatus}>
                    <FaCheckCircle className={styles.checkIcon} />Completado
                  </span>
                ) : (
                  <button
                    className={styles.markCompleteButton}
                    onClick={() => handleMarkAsComplete(meal.id)}
                  >
                    Marcar como completo
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default dieta_diaria;