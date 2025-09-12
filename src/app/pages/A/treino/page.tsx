'use client'

import React, { useEffect, useState } from 'react';
import {
  Dumbbell, Weight, Activity, Trash2, PlusCircle, PlayCircle, CheckCircle
} from 'lucide-react';

import "./page.css";


interface Exercise {
  id: number;
  name: string;
  details: string;
  completed: boolean;
  icon: React.ReactNode;
}

interface Workout {
  id: number;
  title: string;
  description: string;
  exercises: Exercise[];
}

// mock para teste sem backend
const mockWorkouts: Workout[] = [
  {
    id: 1,
    title: "Treino de Peito",
    description: "Foco em força e hipertrofia",
    exercises: [
      { id: 11, name: "Supino Reto", details: "4x12", completed: false, icon: <Dumbbell size={22} /> },
      { id: 12, name: "Supino Inclinado", details: "3x10", completed: false, icon: <Dumbbell size={22} /> },
    ],
  },
  {
    id: 2,
    title: "Treino de Pernas",
    description: "Agachamento e exercícios auxiliares",
    exercises: [
      { id: 21, name: "Agachamento Livre", details: "4x12", completed: false, icon: <Weight size={22} /> },
    ],
  },
];

// Card do exercício
function ExerciseCard({
  exercise,
  onComplete,
  onDelete,
  onEdit,
}: {
  exercise: Exercise;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, details: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(exercise.name);
  const [details, setDetails] = useState(exercise.details);

  const handleSave = () => {
    onEdit(exercise.id, name, details);
    setIsEditing(false);
  };

  return (
    <div className={`exercise-card ${exercise.completed ? 'completed' : ''}`}>
      <div className="exercise-info">
        <div className="exercise-icon">{exercise.icon}</div>
        <div>
          {isEditing ? (
            <>
              <input value={name} onChange={e => setName(e.target.value)} />
              <input value={details} onChange={e => setDetails(e.target.value)} />
            </>
          ) : (
            <>
              <h3>{exercise.name}</h3>
              <p>{exercise.details}</p>
            </>
          )}
        </div>
      </div>
      <div className="exercise-actions">
        {!exercise.completed && (
          <button className="complete-btn" onClick={() => onComplete(exercise.id)}>
            <CheckCircle size={18} />
          </button>
        )}
        {isEditing ? (
          <button onClick={handleSave}>Salvar</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Editar</button>
        )}
        <button className="delete-btn" onClick={() => onDelete(exercise.id)}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

// Página principal
export default function PaginaCompleta() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const [newWorkoutTitle, setNewWorkoutTitle] = useState('');
  const [newWorkoutDesc, setNewWorkoutDesc] = useState('');

  // Buscar treinos da API ou usar mock
  useEffect(() => {
    fetch('http://localhost:4000/workouts')
      .then(res => res.json())
      .then(data => setWorkouts(data))
      .catch(err => {
        console.warn('Não foi possível acessar o backend. Usando dados mock para teste.');
        setWorkouts(mockWorkouts);
      });
  }, []);

  const handleSelectWorkout = (workout: Workout) => setSelectedWorkout(workout);

  const handleAddWorkout = () => {
    if (!newWorkoutTitle.trim()) return;
    const newWorkout: Workout = {
      id: Date.now(),
      title: newWorkoutTitle,
      description: newWorkoutDesc || 'Sem descrição',
      exercises: [],
    };
    const updated = [...workouts, newWorkout];
    setWorkouts(updated);
    setNewWorkoutTitle('');
    setNewWorkoutDesc('');
    setSelectedWorkout(newWorkout);
  };

  const handleDeleteWorkout = (id: number) => {
    const updated = workouts.filter(w => w.id !== id);
    setWorkouts(updated);
    if (selectedWorkout?.id === id) setSelectedWorkout(null);
  };

  const handleAddExercise = () => {
    if (!selectedWorkout) return;
    const newExercise: Exercise = {
      id: Date.now(),
      name: 'Novo Exercício',
      details: '4x12',
      completed: false,
      icon: <Dumbbell size={22} />,
    };
    const updated = workouts.map(w =>
      w.id === selectedWorkout.id ? { ...w, exercises: [...w.exercises, newExercise] } : w
    );
    setWorkouts(updated);
    setSelectedWorkout(updated.find(w => w.id === selectedWorkout.id) || null);
  };

  const handleCompleteExercise = (id: number) => {
    if (!selectedWorkout) return;
    const updated = workouts.map(w =>
      w.id === selectedWorkout.id
        ? { ...w, exercises: w.exercises.map(ex => ex.id === id ? { ...ex, completed: true } : ex) }
        : w
    );
    setWorkouts(updated);
    setSelectedWorkout(updated.find(w => w.id === selectedWorkout.id) || null);
  };

  const handleDeleteExercise = (id: number) => {
    if (!selectedWorkout) return;
    const updated = workouts.map(w =>
      w.id === selectedWorkout.id
        ? { ...w, exercises: w.exercises.filter(ex => ex.id !== id) }
        : w
    );
    setWorkouts(updated);
    setSelectedWorkout(updated.find(w => w.id === selectedWorkout.id) || null);
  };

  const handleEditExercise = (id: number, name: string, details: string) => {
    if (!selectedWorkout) return;
    const updated = workouts.map(w =>
      w.id === selectedWorkout.id
        ? { ...w, exercises: w.exercises.map(ex => ex.id === id ? { ...ex, name, details } : ex) }
        : w
    );
    setWorkouts(updated);
    setSelectedWorkout(updated.find(w => w.id === selectedWorkout.id) || null);
  };

  const completedCount = selectedWorkout ? selectedWorkout.exercises.filter(e => e.completed).length : 0;
  const totalCount = selectedWorkout ? selectedWorkout.exercises.length : 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="page">
      <aside className="sidebar">
        <h2>Meus Treinos</h2>
        <div className="workout-list">
          {workouts.map(workout => (
            <div
              key={workout.id}
              className={`workout-item ${selectedWorkout?.id === workout.id ? 'active' : ''}`}
              onClick={() => handleSelectWorkout(workout)}
            >
              <PlayCircle size={20} />
              <div>
                <h4>{workout.title}</h4>
                <p>{workout.description}</p>
              </div>
              <button className="delete-workout-btn" onClick={(e) => { e.stopPropagation(); handleDeleteWorkout(workout.id); }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="add-workout">
          <input placeholder="Nome do treino" value={newWorkoutTitle} onChange={e => setNewWorkoutTitle(e.target.value)} />
          <input placeholder="Descrição" value={newWorkoutDesc} onChange={e => setNewWorkoutDesc(e.target.value)} />
          <button onClick={handleAddWorkout}>
            <PlusCircle size={18} /> Criar treino
          </button>
        </div>
      </aside>

      <main className="main">
        {selectedWorkout ? (
          <>
            <header className="workout-header">
              <h1>{selectedWorkout.title}</h1>
              <p>{selectedWorkout.description}</p>
              <button className="add-exercise-btn" onClick={handleAddExercise}>
                <PlusCircle size={18} /> Adicionar Exercício
              </button>
            </header>

            <section className="exercise-list">
              {selectedWorkout.exercises.map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onComplete={handleCompleteExercise}
                  onDelete={handleDeleteExercise}
                  onEdit={handleEditExercise}
                />
              ))}
            </section>

            <section className="progress-banner">
              <h3>Progresso: {completedCount}/{totalCount} exercícios ({progress}%)</h3>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <button className="finalize-btn" disabled={progress < 100}>
                Finalizar Treino
              </button>
            </section>
          </>
        ) : (
          <div className="empty-state">
            <h2>Selecione ou crie um treino para começar</h2>
          </div>
        )}
      </main>
    </div>
  );
}

