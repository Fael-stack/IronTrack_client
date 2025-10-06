'use client'

import React, { useEffect, useState } from 'react';
import {
  Dumbbell, Trash2, PlusCircle, PlayCircle, CheckCircle
} from 'lucide-react';

import styles from './page.module.css'; // 👈 IMPORTANTE

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

export default function PaginaCompleta() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/workouts')
      .then(res => res.json())
      .then(data => setWorkouts(data))
      .catch(err => console.error('Erro ao carregar treinos:', err));
  }, []);

  const handleSelectWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const handleAddWorkout = () => {
    const newWorkout: Workout = {
      id: Date.now(),
      title: 'Novo Treino',
      description: 'Descrição do treino',
      exercises: [],
    };
    setWorkouts(prev => [...prev, newWorkout]);
  };

  const handleAddExercise = () => {
    if (!selectedWorkout) return;
    const newExercise: Exercise = {
      id: Date.now(),
      name: 'Novo Exercício',
      details: '4x12',
      completed: false,
      icon: <Dumbbell size={20} />,
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
        ? { ...w, exercises: w.exercises.map(e => e.id === id ? { ...e, completed: true } : e) }
        : w
    );
    setWorkouts(updated);
    setSelectedWorkout(updated.find(w => w.id === selectedWorkout.id) || null);
  };

  const handleDeleteExercise = (id: number) => {
    if (!selectedWorkout) return;
    const updated = workouts.map(w =>
      w.id === selectedWorkout.id
        ? { ...w, exercises: w.exercises.filter(e => e.id !== id) }
        : w
    );
    setWorkouts(updated);
    setSelectedWorkout(updated.find(w => w.id === selectedWorkout.id) || null);
  };

  const completedCount = selectedWorkout?.exercises.filter(e => e.completed).length || 0;
  const totalCount = selectedWorkout?.exercises.length || 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <h2>Meus Treinos</h2>
        <div className={styles.workoutList}>
          {workouts.map(workout => (
            <div
              key={workout.id}
              className={`${styles.workoutItem} ${selectedWorkout?.id === workout.id ? styles.active : ''}`}
              onClick={() => handleSelectWorkout(workout)}
            >
              <PlayCircle size={18} />
              <div>
                <h4>{workout.title}</h4>
                <p>{workout.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.addWorkoutBtn} onClick={handleAddWorkout}>
          <PlusCircle size={18} /> Criar treino
        </button>
      </aside>

      <main className={styles.main}>
        {selectedWorkout ? (
          <>
            <header className={styles.workoutHeader}>
              <h1>{selectedWorkout.title}</h1>
              <p>{selectedWorkout.description}</p>
              <button className={styles.addExerciseBtn} onClick={handleAddExercise}>
                <PlusCircle size={18} /> Adicionar Exercício
              </button>
            </header>

            <section className={styles.exerciseList}>
              {selectedWorkout.exercises.map(ex => (
                <div key={ex.id} className={`${styles.exerciseCard} ${ex.completed ? styles.completed : ''}`}>
                  <div className={styles.exerciseInfo}>
                    <div className={styles.exerciseIcon}>{ex.icon}</div>
                    <div>
                      <h3>{ex.name}</h3>
                      <p>{ex.details}</p>
                    </div>
                  </div>
                  <div className={styles.exerciseActions}>
                    {!ex.completed && (
                      <button className={styles.completeBtn} onClick={() => handleCompleteExercise(ex.id)}>
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button className={styles.deleteBtn} onClick={() => handleDeleteExercise(ex.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </section>

            <section className={styles.progressBanner}>
              <h3>Progresso: {completedCount}/{totalCount} exercícios ({progress}%)</h3>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
              </div>
              <button className={styles.finalizeBtn} disabled={progress < 100}>
                Finalizar Treino
              </button>
            </section>
          </>
        ) : (
          <div className={styles.emptyState}>
            <h2>Selecione ou crie um treino para começar</h2>
          </div>
        )}
      </main>
    </div>
  );
}
