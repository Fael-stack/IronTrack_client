'use client'

import React, { useEffect, useState } from 'react';
import {
  Dumbbell, Weight, Activity, Trash2, PlusCircle, PlayCircle, CheckCircle, Utensils
} from 'lucide-react';

import "./page.css";


interface Meal {
  id: number;
  name: string;
  details: string;
  completed: boolean;
  icon: React.ReactNode;
}

interface Diet {
  id: number;
  title: string;
  description: string;
  meals: Meal[];
  dayOfWeek: string; // Novo campo
  period: string;    // Novo campo
}

// mock para teste sem backend
const mockDiets: Diet[] = [
  {
    id: 1,
    title: "Dieta Hipercalórica",
    description: "Foco em ganho de massa",
    meals: [
      { id: 11, name: "Café da manhã", details: "Ovos, aveia, banana", completed: false, icon: <Utensils size={22} /> },
      { id: 12, name: "Almoço", details: "Arroz, frango, salada", completed: false, icon: <Utensils size={22} /> },
    ],
    dayOfWeek: "Segunda-feira",
    period: "Almoço",
  },
  {
    id: 2,
    title: "Dieta Low Carb",
    description: "Redução de carboidratos",
    meals: [
      { id: 21, name: "Jantar", details: "Peixe, legumes", completed: false, icon: <Utensils size={22} /> },
    ],
    dayOfWeek: "Terça-feira",
    period: "Jantar",
  },
];

// Card da refeição
function MealCard({
  meal,
  onComplete,
  onDelete,
  onEdit,
}: {
  meal: Meal;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, details: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(meal.name);
  const [details, setDetails] = useState(meal.details);

  const handleSave = () => {
    onEdit(meal.id, name, details);
    setIsEditing(false);
  };

  return (
    <div className={`exercise-card ${meal.completed ? 'completed' : ''}`}>
      <div className="exercise-info">
        <div className="exercise-icon">{meal.icon}</div>
        <div>
          {isEditing ? (
            <>
              <input value={name} onChange={e => setName(e.target.value)} />
              <input value={details} onChange={e => setDetails(e.target.value)} />
            </>
          ) : (
            <>
              <h3>{meal.name}</h3>
              <p>{meal.details}</p>
            </>
          )}
        </div>
      </div>
      <div className="exercise-actions">
        {!meal.completed && (
          <button className="complete-btn" onClick={() => onComplete(meal.id)}>
            <CheckCircle size={18} />
          </button>
        )}
        {isEditing ? (
          <button onClick={handleSave}>Salvar</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Editar</button>
        )}
        <button className="delete-btn" onClick={() => onDelete(meal.id)}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

// Página principal
export default function PaginaDieta() {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<Diet | null>(null);

  const [newDietTitle, setNewDietTitle] = useState('');
  const [newDietDesc, setNewDietDesc] = useState('');
  const [newDietDay, setNewDietDay] = useState('Segunda-feira');
  const [newDietPeriod, setNewDietPeriod] = useState('Café da manhã');

  const daysOfWeek = [
    "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"
  ];
  const periods = [
    "Café da manhã", "Almoço", "Jantar", "Lanche", "Ceia"
  ];

  // Buscar dietas da API ou usar mock
  useEffect(() => {
    fetch('http://localhost:4000/diets')
      .then(res => res.json())
      .then(data => setDiets(data))
      .catch(err => {
        console.warn('Não foi possível acessar o backend. Usando dados mock para teste.');
        setDiets(mockDiets);
      });
  }, []);

  const handleSelectDiet = (diet: Diet) => setSelectedDiet(diet);

  const handleAddDiet = () => {
    if (!newDietTitle.trim()) return;
    const newDiet: Diet = {
      id: Date.now(),
      title: newDietTitle,
      description: newDietDesc || 'Sem descrição',
      meals: [],
      dayOfWeek: newDietDay,
      period: newDietPeriod,
    };
    const updated = [...diets, newDiet];
    setDiets(updated);
    setNewDietTitle('');
    setNewDietDesc('');
    setNewDietDay('Segunda-feira');
    setNewDietPeriod('Café da manhã');
    setSelectedDiet(newDiet);
  };

  const handleDeleteDiet = (id: number) => {
    const updated = diets.filter(d => d.id !== id);
    setDiets(updated);
    if (selectedDiet?.id === id) setSelectedDiet(null);
  };

  const handleAddMeal = () => {
    if (!selectedDiet) return;
    const newMeal: Meal = {
      id: Date.now(),
      name: 'Nova Refeição',
      details: 'Ex: Frango, arroz, salada',
      completed: false,
      icon: <Utensils size={22} />,
    };
    const updated = diets.map(d =>
      d.id === selectedDiet.id ? { ...d, meals: [...d.meals, newMeal] } : d
    );
    setDiets(updated);
    setSelectedDiet(updated.find(d => d.id === selectedDiet.id) || null);
  };

  const handleCompleteMeal = (id: number) => {
    if (!selectedDiet) return;
    const updated = diets.map(d =>
      d.id === selectedDiet.id
        ? { ...d, meals: d.meals.map(m => m.id === id ? { ...m, completed: true } : m) }
        : d
    );
    setDiets(updated);
    setSelectedDiet(updated.find(d => d.id === selectedDiet.id) || null);
  };

  const handleDeleteMeal = (id: number) => {
    if (!selectedDiet) return;
    const updated = diets.map(d =>
      d.id === selectedDiet.id
        ? { ...d, meals: d.meals.filter(m => m.id !== id) }
        : d
    );
    setDiets(updated);
    setSelectedDiet(updated.find(d => d.id === selectedDiet.id) || null);
  };

  const handleEditMeal = (id: number, name: string, details: string) => {
    if (!selectedDiet) return;
    const updated = diets.map(d =>
      d.id === selectedDiet.id
        ? { ...d, meals: d.meals.map(m => m.id === id ? { ...m, name, details } : m) }
        : d
    );
    setDiets(updated);
    setSelectedDiet(updated.find(d => d.id === selectedDiet.id) || null);
  };

  const completedCount = selectedDiet ? selectedDiet.meals.filter(m => m.completed).length : 0;
  const totalCount = selectedDiet ? selectedDiet.meals.length : 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="page">
      <aside className="sidebar">
        <h2>Minhas Dietas</h2>
        <div className="workout-list">
          {diets.map(diet => (
            <div
              key={diet.id}
              className={`workout-item ${selectedDiet?.id === diet.id ? 'active' : ''}`}
              onClick={() => handleSelectDiet(diet)}
            >
              <PlayCircle size={20} />
              <div>
                <h4>{diet.title}</h4>
                <p>{diet.description}</p>
                <small>
                  {diet.dayOfWeek} - {diet.period}
                </small>
              </div>
              <button className="delete-workout-btn" onClick={(e) => { e.stopPropagation(); handleDeleteDiet(diet.id); }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="add-workout">
          <input placeholder="Nome da dieta" value={newDietTitle} onChange={e => setNewDietTitle(e.target.value)} />
          <input placeholder="Descrição" value={newDietDesc} onChange={e => setNewDietDesc(e.target.value)} />
          <select value={newDietDay} onChange={e => setNewDietDay(e.target.value)}>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <select value={newDietPeriod} onChange={e => setNewDietPeriod(e.target.value)}>
            {periods.map(period => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
          <button onClick={handleAddDiet}>
            <PlusCircle size={18} /> Criar dieta
          </button>
        </div>
      </aside>

      <main className="main">
        {selectedDiet ? (
          <>
            <header className="workout-header">
              <div>
                <h1>{selectedDiet.title}</h1>
                <p>{selectedDiet.description}</p>
                <small>
                  {selectedDiet.dayOfWeek} - {selectedDiet.period}
                </small>
              </div>
              <button className="add-exercise-btn" onClick={handleAddMeal}>
                <PlusCircle size={18} /> Adicionar Refeição
              </button>
            </header>

            <section className="exercise-list">
              {selectedDiet.meals.map(meal => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onComplete={handleCompleteMeal}
                  onDelete={handleDeleteMeal}
                  onEdit={handleEditMeal}
                />
              ))}
            </section>

            <section className="progress-banner">
              <h3>Progresso: {completedCount}/{totalCount} refeições ({progress}%)</h3>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <button className="finalize-btn" disabled={progress < 100}>
                Finalizar Dieta
              </button>
            </section>
          </>
        ) : (
          <div className="empty-state">
            <h2>Selecione ou crie uma dieta para começar</h2>
          </div>
        )}
      </main>
    </div>
  );
}

