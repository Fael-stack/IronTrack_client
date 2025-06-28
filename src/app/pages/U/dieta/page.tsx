'use client';
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
import './page.css'; // Changed to import a global CSS file

const DietaDiaria: React.FC = () => { // Renamed component to PascalCase
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

 
  const handleMarkAsComplete = (id: string) => {
    console.log(`Refeição ${id} marcada como completa!`);
    
  };

  return (
    <div className="pageContainer">
      {/* Assumindo que o cabeçalho Iron Track está em outro componente ou será adicionado aqui */}
      {/* Um placeholder para o cabeçalho, similar aos exemplos anteriores */}
      <header className="header">
        <div className="headerLeft">
          {/* Removed FaHeartbeat as it was not present in the original input's headerLeft for this file */}
          <span className="headerLogoText">Iron Track</span>
        </div>
        <nav className="headerNav">
          <ul>
            <li>Dashboard</li>
            <li>Treinos</li>
            <li className="activeLink">Dieta</li> {/* Exemplo de link ativo */}
            <li>Perfil</li>
          </ul>
        </nav>
        <div className="headerRight">
          {/* Placeholder for icons/avatar as in the original */}
          <div className="headerAvatarPlaceholder"></div>
          <div className="headerOtherAvatar"></div>
        </div>
      </header>

      <main className="mainContent">
        <h1 className="sectionTitle">Minha dieta diária</h1>

        <div className="summaryCards">
          {/* Card Meta de água */}
          <div className="card">
            <div className="cardHeader">
              <FaTint className="cardIconWater" />
              <span className="cardTitle">Meta de água</span>
            </div>
            <p className="cardValue">{waterGoal.current}L <span className="cardTarget">/ {waterGoal.target}L meta</span></p>
            <div className="progressBarBackground">
              <div
                className="progressBarFill"
                style={{ width: `${(waterGoal.current / waterGoal.target) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Card Calorias */}
          <div className="card">
            <div className="cardHeader">
              <FaFireAlt className="cardIconCalories" />
              <span className="cardTitle">Calorias</span>
            </div>
            <p className="cardValue">{calories.current} <span className="cardTarget">/ {calories.target} kcal</span></p>
            <div className="progressBarBackground">
              <div
                className="progressBarFill"
                style={{ width: `${(calories.current / calories.target) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Card Refeições hoje */}
          <div className="card">
            <div className="cardHeader">
              <FaUtensils className="cardIconMeals" />
              <span className="cardTitle">Refeições hoje</span>
            </div>
            <p className="cardValue">{meals.current} <span className="cardTarget">/ {meals.target} refeições</span></p>
            <div className="progressBarBackground">
              <div
                className="progressBarFill"
                style={{ width: `${(meals.current / meals.target) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <h2 className="sectionTitle">Dieta de hoje</h2>

        <div className="dietList">
          {dietPlan.map((meal) => (
            <div key={meal.id} className="mealItem">
              <div className="mealLeft">
                <div className="mealIconWrapper">
                  {React.createElement(meal.icon, { className: "mealIcon" })}
                  <span className="mealTime">{meal.time}</span>
                </div>
                <div className="mealDetails">
                  <p className="mealTitle">{meal.title}</p>
                  <p className="mealDescription">{meal.description}</p>
                </div>
              </div>
              <div className="mealRight">
                {meal.completed ? (
                  <span className="completedStatus">
                    <FaCheckCircle className="checkIcon" />Completado
                  </span>
                ) : (
                  <button
                    className="markCompleteButton"
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

export default DietaDiaria; // Export the renamed component