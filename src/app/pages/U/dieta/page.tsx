"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

interface Dieta {
  _id: string;
  name: string;
  day_time: string;
  week_day: string;
  macronutrients: string[];
  kcal: number;
  ingredients: string[];
}

export default function DietaPage() {
  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [selectedDieta, setSelectedDieta] = useState<Dieta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newDieta, setNewDieta] = useState<Omit<Dieta, "_id">>({
    name: "",
    day_time: "manhã",
    week_day: "segunda",
    macronutrients: [],
    kcal: 0,
    ingredients: [],
  });

  const [editDieta, setEditDieta] = useState<Dieta | null>(null);

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

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

  useEffect(() => {
    if (!token || !userId) return;

    const fetchDietas = async () => {
      try {
        const res = await fetch(`http://localhost:4000/dietas/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Erro ao buscar dietas: ${res.status}`);
        const data: Dieta[] = await res.json();
        setDietas(data);
        setSelectedDieta(data[0] || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDietas();
  }, [token, userId]);

  const createDieta = async () => {
    if (!newDieta.name || !userId) return;

    try {
      const res = await fetch(`http://localhost:4000/dietas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newDieta, userId }),
      });

      if (!res.ok) throw new Error("Erro ao criar dieta");
      const created: Dieta = await res.json();
      setDietas([...dietas, created]);
      setSelectedDieta(created);

      setNewDieta({
        name: "",
        day_time: "manhã",
        week_day: "segunda",
        macronutrients: [],
        kcal: 0,
        ingredients: [],
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateDieta = async (dieta: Dieta) => {
    try {
      const res = await fetch(`http://localhost:4000/dietas/${dieta._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dieta),
      });

      if (!res.ok) throw new Error("Erro ao atualizar dieta");
      const updated: Dieta = await res.json();
      setDietas(dietas.map(d => (d._id === updated._id ? updated : d)));
      setSelectedDieta(updated);
      setEditDieta(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteDieta = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/dietas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erro ao deletar dieta");
      setDietas(dietas.filter(d => d._id !== id));
      if (selectedDieta?._id === id) setSelectedDieta(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className={styles.page}>Carregando dietas...</div>;
  if (error) return <div className={styles.page}>{error}</div>;

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <h2>Suas Dietas</h2>
        <div className={styles.workoutList}>
          {dietas.map(d => (
            <div
              key={d._id}
              className={`${styles.workoutItem} ${selectedDieta?._id === d._id ? styles.active : ""}`}
              onClick={() => setSelectedDieta(d)}
            >
              <h4>{d.name}</h4>
              <p>{d.week_day} - {d.day_time}</p>
            </div>
          ))}
        </div>

        <div className={styles.addWorkout}>
          <input
            type="text"
            placeholder="Nome da dieta"
            value={newDieta.name}
            onChange={e => setNewDieta({ ...newDieta, name: e.target.value })}
          />
          <select value={newDieta.day_time} onChange={e => setNewDieta({ ...newDieta, day_time: e.target.value })}>
            <option value="manhã">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="noite">Noite</option>
          </select>
          <select value={newDieta.week_day} onChange={e => setNewDieta({ ...newDieta, week_day: e.target.value })}>
            <option value="segunda">Segunda</option>
            <option value="terça">Terça</option>
            <option value="quarta">Quarta</option>
            <option value="quinta">Quinta</option>
            <option value="sexta">Sexta</option>
            <option value="sábado">Sábado</option>
            <option value="domingo">Domingo</option>
          </select>
          <input
            type="number"
            placeholder="Calorias"
            value={newDieta.kcal}
            onChange={e => setNewDieta({ ...newDieta, kcal: Number(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Macronutrientes (vírgula)"
            value={newDieta.macronutrients.join(",")}
            onChange={e => setNewDieta({ ...newDieta, macronutrients: e.target.value.split(",") })}
          />
          <input
            type="text"
            placeholder="Ingredientes (vírgula)"
            value={newDieta.ingredients.join(",")}
            onChange={e => setNewDieta({ ...newDieta, ingredients: e.target.value.split(",") })}
          />
          <button onClick={createDieta}>Criar dieta</button>
        </div>
      </div>

      <div className={styles.main}>
        {selectedDieta ? (
          <div>
            <h2>{selectedDieta.name}</h2>
            <p>Dia: {selectedDieta.week_day} - Horário: {selectedDieta.day_time}</p>
            <p>Calorias: {selectedDieta.kcal}</p>
            <p>Macronutrientes: {selectedDieta.macronutrients.join(", ")}</p>
            <p>Ingredientes: {selectedDieta.ingredients.join(", ")}</p>

            <button onClick={() => deleteDieta(selectedDieta._id)} style={{ marginRight: 10 }}>Deletar</button>
            <button onClick={() => setEditDieta(selectedDieta)}>Editar</button>
          </div>
        ) : (
          <p className={styles.emptyState}>Selecione uma dieta ou crie uma nova</p>
        )}

        {editDieta && (
          <div className={styles.editModal}>
            <div className={styles.editModalContent}>
              <h3>Editar dieta</h3>
              <input type="text" value={editDieta.name} onChange={e => setEditDieta({ ...editDieta, name: e.target.value })} />
              <select value={editDieta.day_time} onChange={e => setEditDieta({ ...editDieta, day_time: e.target.value })}>
                <option value="manhã">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </select>
              <select value={editDieta.week_day} onChange={e => setEditDieta({ ...editDieta, week_day: e.target.value })}>
                <option value="segunda">Segunda</option>
                <option value="terça">Terça</option>
                <option value="quarta">Quarta</option>
                <option value="quinta">Quinta</option>
                <option value="sexta">Sexta</option>
                <option value="sábado">Sábado</option>
                <option value="domingo">Domingo</option>
              </select>
              <input type="number" value={editDieta.kcal} onChange={e => setEditDieta({ ...editDieta, kcal: Number(e.target.value) })} placeholder="kcal" />
              <input type="text" value={editDieta.macronutrients.join(",")} onChange={e => setEditDieta({ ...editDieta, macronutrients: e.target.value.split(",") })} />
              <input type="text" value={editDieta.ingredients.join(",")} onChange={e => setEditDieta({ ...editDieta, ingredients: e.target.value.split(",") })} />
              <div style={{ marginTop: 10 }}>
                <button onClick={() => updateDieta(editDieta)}>Salvar</button>
                <button onClick={() => setEditDieta(null)} style={{ marginLeft: 10 }}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
