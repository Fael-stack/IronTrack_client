"use client";
import React, { useEffect, useState } from "react";
import DietaModal from "@/components/Modal/DietaModal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [editDieta, setEditDieta] = useState<Dieta | null>(null);
  const [currentDietaIndex, setCurrentDietaIndex] = useState<number | null>(null);

  // Carregar dietas do usuário logado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("Token não encontrado.");

    fetch("http://localhost:4000/dietas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error("Erro ao buscar dietas:", data.error);
          setDietas([]);
        } else {
          setDietas(data);
        }
      })
      .catch(err => {
        console.error(err);
        setDietas([]);
      });
  }, []);

  const handleSaveDieta = async (dietaInput: Omit<Dieta, "_id">) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado.");

      let response;

      if (editDieta && currentDietaIndex !== null) {
        response = await fetch(`http://localhost:4000/dietas/${editDieta._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(dietaInput),
        });
      } else {
        response = await fetch("http://localhost:4000/dietas", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(dietaInput),
        });
      }

      const saved = await response.json();
      if (!response.ok) throw new Error(saved.error || "Erro ao salvar dieta.");

      if (editDieta && currentDietaIndex !== null) {
        const updated = [...dietas];
        updated[currentDietaIndex] = saved;
        setDietas(updated);
      } else {
        setDietas(prev => [...prev, saved]);
      }

      setEditDieta(null);
      setCurrentDietaIndex(null);
      setModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const deleteDieta = async (idx: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const dietaDel = dietas[idx];
    try {
      const res = await fetch(`http://localhost:4000/dietas/${dietaDel._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao deletar dieta.");
      setDietas(prev => prev.filter((_, i) => i !== idx));
    } catch (err) {
      console.error(err);
    }
  };

  const editExistingDieta = (idx: number) => {
    setEditDieta(dietas[idx]);
    setCurrentDietaIndex(idx);
    setModalOpen(true);
  };

  return (
    <div className="container">
      <h1>Suas Dietas</h1>

      {dietas.map((dieta, idx) => (
        <div key={dieta._id} className="dieta-card">
          <div className="dieta-header">
            <h2>{dieta.name}</h2>
            <span>{dieta.kcal} kcal</span>
          </div>
          <p>{dieta.day_time} — {dieta.week_day}</p>
          <p><strong>Macros:</strong> {dieta.macronutrients.join(", ")}</p>
          <p><strong>Ingredientes:</strong> {dieta.ingredients.join(", ")}</p>
          <div className="dieta-actions">
            <button onClick={() => editExistingDieta(idx)}>Editar</button>
            <button onClick={() => deleteDieta(idx)}>Deletar</button>
          </div>
        </div>
      ))}

      <button className="create-btn" onClick={() => setModalOpen(true)}>Criar Dieta</button>

      {modalOpen && (
        <DietaModal
          editDieta={editDieta}
          onClose={() => { setModalOpen(false); setEditDieta(null); setCurrentDietaIndex(null); }}
          onSave={handleSaveDieta}
        />
      )}

      <style>{`
        .container { max-width: 800px; margin: auto; padding: 20px; }
        h1 { text-align: center; margin-bottom: 20px; }
        .dieta-card { border: 1px solid #ccc; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #f9f9f9; }
        .dieta-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .dieta-actions { margin-top: 10px; display: flex; gap: 10px; }
        .dieta-actions button, .create-btn { cursor: pointer; padding: 5px 10px; border: none; border-radius: 4px; }
        .dieta-actions button { background: #ffcc00; }
        .dieta-actions button:nth-child(2) { background: #ff4444; color: white; }
        .create-btn { margin-top: 15px; background: #007bff; color: white; }
      `}</style>
    </div>
  );
}
