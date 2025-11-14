"use client";
import React, { useState, useEffect } from "react";
import TreinoModal from "@/components/Modal/TreinoModal";
import styles from "./page.module.css";

interface Exercise {
  name: string;
  details: string;
  completed: boolean;
}

interface Treino {
  _id: string | null;
  name: string;
  day_time: string;
  week_day: string;
  exercises: Exercise[];
}

export default function TreinadorPage() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTreino, setEditTreino] = useState<Treino | null>(null);
  const [currentTreinoIndex, setCurrentTreinoIndex] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Pegar token apenas no cliente
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // Carregar treinos do backend após token existir
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:4000/treinos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const normalized = data.map((t: any) => ({
            ...t,
            exercises: Array.isArray(t.exercises) ? t.exercises : [],
          }));
          setTreinos(normalized);
        } else {
          setTreinos([]);
          console.error("Retorno inesperado:", data);
        }
      })
      .catch(err => {
        console.error(err);
        setTreinos([]);
      });
  }, [token]);

  const handleSaveTreino = async (treinoInput: Omit<Treino, "_id">) => {
    if (!token) return;
    try {
      let response;
      if (editTreino && currentTreinoIndex !== null) {
        response = await fetch(`http://localhost:4000/treinos/${editTreino._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(treinoInput),
        });
      } else {
        response = await fetch("http://localhost:4000/treinos", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(treinoInput),
        });
      }

      const savedTreino = await response.json();
      if (!response.ok) throw new Error(savedTreino.error || "Erro ao salvar treino");

      if (editTreino && currentTreinoIndex !== null) {
        const updated = [...treinos];
        updated[currentTreinoIndex] = { ...savedTreino, exercises: savedTreino.exercises || [] };
        setTreinos(updated);
      } else {
        setTreinos(prev => [...prev, { ...savedTreino, exercises: savedTreino.exercises || [] }]);
      }

      setEditTreino(null);
      setCurrentTreinoIndex(null);
      setModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const toggleExerciseCompletion = async (treinoIdx: number, exIdx: number) => {
    if (!token) return;

    const updated = [...treinos];
    const exercise = updated[treinoIdx].exercises[exIdx];
    exercise.completed = !exercise.completed;
    setTreinos(updated);

    try {
      await fetch(`http://localhost:4000/treinos/${updated[treinoIdx]._id}/exercises/${exIdx}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const calculateProgress = (treino: Treino) => {
    const exercises = treino.exercises || [];
    if (exercises.length === 0) return 0;
    const completed = exercises.filter(ex => ex.completed).length;
    return Math.round((completed / exercises.length) * 100);
  };

  const deleteTreino = async (idx: number) => {
    if (!token) return;
    const treinoToDelete = treinos[idx];
    try {
      await fetch(`http://localhost:4000/treinos/${treinoToDelete._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTreinos(prev => prev.filter((_, i) => i !== idx));
    } catch (err) {
      console.error(err);
    }
  };

  const editExistingTreino = (idx: number) => {
    setEditTreino(treinos[idx]);
    setCurrentTreinoIndex(idx);
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Seus Treinos</h1>

      {token && treinos.map((t, idx) => {
        const progress = calculateProgress(t); // calculado no cliente
        return (
          <div key={t._id || idx} className={styles.treinoCard}>
            <div className={styles.treinoHeader}>
              <h2 className={progress === 100 ? styles.completed : ""}>{t.name}</h2>
              <span>{progress}%</span>
            </div>

            <div className={styles.progressBarContainer}>
              <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
            </div>

            <p className={styles.description}>{t.day_time} - {t.week_day}</p>

            <ul className={styles.exerciseList}>
              {t.exercises.map((ex, i) => (
                <li key={i} className={styles.exerciseItem}>
                  <span className={ex.completed ? styles.completed : ""}>{ex.name} ({ex.details})</span>
                  <button className={styles.exerciseButton} onClick={() => toggleExerciseCompletion(idx, i)}>
                    {ex.completed ? "Desmarcar" : "Completo"}
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.treinoActions}>
              <button className={styles.treinoActionsButton} onClick={() => editExistingTreino(idx)}>Editar</button>
              <button className={`${styles.treinoActionsButton} ${styles.treinoActionsButtonDelete}`} onClick={() => deleteTreino(idx)}>Deletar</button>
            </div>
          </div>
        );
      })}

      <button className={styles.createBtn} onClick={() => setModalOpen(true)}>Criar Treino</button>

      {modalOpen && (
        <TreinoModal
          onClose={() => { setModalOpen(false); setEditTreino(null); setCurrentTreinoIndex(null); }}
          onSave={handleSaveTreino}
          editTreino={editTreino}
        />
      )}
    </div>
  );
}
