"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

interface Exercise {
  _id: string;
  name: string;
  details: string;
  completed: boolean;
}

interface Workout {
  _id: string;
  name: string;
  day_time: string;
  week_day: string;
  exercises: Exercise[];
}

export default function TreinoPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newWorkout, setNewWorkout] = useState({ name: "", day_time: "manhã", week_day: "segunda" });
  const [newExercise, setNewExercise] = useState({ name: "", details: "" });

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Recupera token e userId
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");

    if (!savedToken || !savedUserId) {
      setError("Usuário não logado");
      setLoading(false);
      return;
    }

    setToken(savedToken);
    setUserId(savedUserId);
  }, []);

  // Buscar treinos do usuário
  useEffect(() => {
    if (!token || !userId) return;

    const fetchWorkouts = async () => {
      try {
        const res = await fetch(`http://localhost:4000/treinos/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Erro ao buscar treinos: ${res.status}`);
        const data: Workout[] = await res.json();
        setWorkouts(data);
        setSelectedWorkout(data[0] || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [token, userId]);

  // Criar novo treino
  const createWorkout = async () => {
    if (!newWorkout.name || !userId) return;
    try {
      const res = await fetch(`http://localhost:4000/treinos/user/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newWorkout, exercises: [] }),
      });

      if (!res.ok) throw new Error("Erro ao criar treino");

      const createdWorkout: Workout = await res.json();
      setWorkouts([...workouts, createdWorkout]);
      setSelectedWorkout(createdWorkout);
      setNewWorkout({ name: "", day_time: "manhã", week_day: "segunda" });
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Adicionar exercício
  const addExercise = async () => {
    if (!selectedWorkout || !newExercise.name) return;
    try {
      const res = await fetch(`http://localhost:4000/treinos/${selectedWorkout._id}/exercises`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newExercise, completed: false }),
      });

      if (!res.ok) throw new Error("Erro ao adicionar exercício");

      const updatedWorkout: Workout = await res.json();
      setSelectedWorkout(updatedWorkout);
      setWorkouts(workouts.map(w => w._id === updatedWorkout._id ? updatedWorkout : w));
      setNewExercise({ name: "", details: "" });
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Toggle completo/incompleto
  const toggleComplete = async (exerciseId: string) => {
    if (!selectedWorkout) return;

    try {
      const res = await fetch(
        `http://localhost:4000/treinos/${selectedWorkout._id}/exercises/${exerciseId}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Erro ao atualizar exercício");

      const updatedWorkout: Workout = await res.json();
      setSelectedWorkout(updatedWorkout);
      setWorkouts(workouts.map(w => w._id === updatedWorkout._id ? updatedWorkout : w));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Deletar exercício
  const deleteExercise = async (exerciseId: string) => {
    if (!selectedWorkout) return;

    try {
      const res = await fetch(
        `http://localhost:4000/treinos/${selectedWorkout._id}/exercises/${exerciseId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Erro ao deletar exercício");

      const updatedWorkout: Workout = await res.json();
      setSelectedWorkout(updatedWorkout);
      setWorkouts(workouts.map(w => w._id === updatedWorkout._id ? updatedWorkout : w));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Deletar treino
  const deleteWorkout = async (workoutId: string) => {
    if (!window.confirm("Tem certeza que deseja deletar este treino?")) return;

    try {
      const res = await fetch(`http://localhost:4000/treinos/${workoutId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erro ao deletar treino");

      setWorkouts(workouts.filter(w => w._id !== workoutId));
      if (selectedWorkout?._id === workoutId) setSelectedWorkout(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className={styles.page}>Carregando treinos...</div>;
  if (error) return <div className={styles.page}>{error}</div>;

  const completedCount = selectedWorkout?.exercises?.filter(e => e.completed).length || 0;
  const totalCount = selectedWorkout?.exercises?.length || 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2>Seus Treinos</h2>
        <div className={styles.workoutList}>
          {workouts.map(w => (
            <div
              key={w._id}
              className={`${styles.workoutItem} ${selectedWorkout?._id === w._id ? styles.active : ""}`}
              onClick={() => setSelectedWorkout(w)}
            >
              <h4>{w.name}</h4>
              <p>{w.week_day} - {w.day_time}</p>
            </div>
          ))}
        </div>

        {/* Criar treino */}
        <div className={styles.addWorkout}>
          <input
            type="text"
            placeholder="Nome do treino"
            value={newWorkout.name}
            onChange={e => setNewWorkout({ ...newWorkout, name: e.target.value })}
          />
          <select value={newWorkout.day_time} onChange={e => setNewWorkout({ ...newWorkout, day_time: e.target.value })}>
            <option value="manhã">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="noite">Noite</option>
          </select>
          <select value={newWorkout.week_day} onChange={e => setNewWorkout({ ...newWorkout, week_day: e.target.value })}>
            <option value="segunda">Segunda</option>
            <option value="terça">Terça</option>
            <option value="quarta">Quarta</option>
            <option value="quinta">Quinta</option>
            <option value="sexta">Sexta</option>
            <option value="sábado">Sábado</option>
            <option value="domingo">Domingo</option>
          </select>
          <button onClick={createWorkout}>Criar treino</button>
        </div>
      </div>

      {/* Área principal */}
      <div className={styles.main}>
        {selectedWorkout ? (
          <>
            <h2>{selectedWorkout.name}</h2>
            <p>Dia: {selectedWorkout.week_day} - Horário: {selectedWorkout.day_time}</p>
            <p>Progresso: {progress}%</p>
            <button className={styles.deleteBtn} onClick={() => deleteWorkout(selectedWorkout._id)}>Deletar treino</button>

            <div className={styles.exerciseList}>
              {selectedWorkout.exercises.map(e => (
                <div key={e._id} className={`${styles.exerciseCard} ${e.completed ? styles.completed : ""}`}>
                  <div className={styles.exerciseInfo}>
                    <strong>{e.name}</strong>
                    <p>{e.details}</p>
                  </div>
                  <div className={styles.exerciseActions}>
                    <button className={styles.completeBtn} onClick={() => toggleComplete(e._id)}>
                      {e.completed ? "Incompleto" : "Completo"}
                    </button>
                    <button className={styles.deleteBtn} onClick={() => deleteExercise(e._id)}>Deletar</button>
                  </div>
                </div>
              ))}
              {selectedWorkout.exercises.length === 0 && <p className={styles.emptyState}>Nenhum exercício disponível</p>}
            </div>

            {/* Adicionar novo exercício */}
            <div className={styles.addWorkout}>
              <input
                type="text"
                placeholder="Nome do exercício"
                value={newExercise.name}
                onChange={e => setNewExercise({ ...newExercise, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Detalhes do exercício"
                value={newExercise.details}
                onChange={e => setNewExercise({ ...newExercise, details: e.target.value })}
              />
              <button onClick={addExercise}>Adicionar exercício</button>
            </div>
          </>
        ) : (
          <p className={styles.emptyState}>Selecione um treino ou crie um novo</p>
        )}
      </div>
    </div>
  );
}
