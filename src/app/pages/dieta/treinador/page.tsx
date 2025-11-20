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

interface Aluno {
  _id: string;
  name: string;
}

export default function DietasTreinadorPage() {
  const [token, setToken] = useState<string | null>(null);
  const [treinadorId, setTreinadorId] = useState<string | null>(null);

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<string>("");

  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDieta, setEditDieta] = useState<Dieta | null>(null);
  const [currentDietaIndex, setCurrentDietaIndex] = useState<number | null>(null);

  // Carregar token e ID do treinador no CLIENTE
  useEffect(() => {
    const t = localStorage.getItem("token");
    const tid = localStorage.getItem("userId"); // Trainer ID salvo no login

    if (!t || !tid) {
      console.error("Treinador não autenticado.");
      return;
    }

    setToken(t);
    setTreinadorId(tid);
  }, []);

  // Carregar alunos do treinador
  useEffect(() => {
    if (!token || !treinadorId) return;

    fetch(`http://localhost:4000/contracts/treinador/${treinadorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return setAlunos([]);
        setAlunos(data);

      });
  }, [token, treinadorId]);

  // Carregar dietas do aluno selecionado
  useEffect(() => {
    if (!selectedAluno || !token) return;

    fetch(`http://localhost:4000/dietas/user/${selectedAluno}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setDietas(data || []));
  }, [selectedAluno, token]);

  // Criar ou Atualizar dieta
  const handleSaveDieta = async (dietaInput: Omit<Dieta, "_id">) => {
    try {
      if (!token || !selectedAluno) throw new Error("Treinador não autenticado.");

      let response;

      if (editDieta && currentDietaIndex !== null) {
        response = await fetch(`http://localhost:4000/dietas/${editDieta._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dietaInput),
        });
      } else {
        response = await fetch("http://localhost:4000/dietas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...dietaInput, userId: selectedAluno }),
        });
      }

      const saved = await response.json();
      if (!response.ok) throw new Error(saved.error || "Erro ao salvar dieta.");

      if (editDieta && currentDietaIndex !== null) {
        const updated = [...dietas];
        updated[currentDietaIndex] = saved;
        setDietas(updated);
      } else {
        setDietas((prev) => [...prev, saved]);
      }

      setEditDieta(null);
      setCurrentDietaIndex(null);
      setModalOpen(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const editExistingDieta = (idx: number) => {
    setEditDieta(dietas[idx]);
    setCurrentDietaIndex(idx);
    setModalOpen(true);
  };

  const deleteDieta = async (idx: number) => {
    const dieta = dietas[idx];
    if (!token) return;

    const res = await fetch(`http://localhost:4000/dietas/${dieta._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setDietas((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="container">
      <h1>Dietas dos Alunos</h1>

      {/* Seleção do aluno */}
      <div className="select-area">
        <label>Selecione um aluno:</label>
        <select
          value={selectedAluno}
          onChange={(e) => setSelectedAluno(e.target.value)}
        >
          <option value="">Escolha um aluno</option>
          {alunos.map((al) => (
            <option key={al._id} value={al._id}>
              {al.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar dietas somente se houver aluno */}
      {selectedAluno && (
        <>
          <h2>Dietas de {alunos.find((a) => a._id === selectedAluno)?.name}</h2>

          {dietas.map((dieta, idx) => (
            <div key={dieta._id} className="dieta-card">
              <div className="dieta-header">
                <h3>{dieta.name}</h3>
                <span>{dieta.kcal} kcal</span>
              </div>

              <p>
                {dieta.day_time} — {dieta.week_day}
              </p>

              <p>
                <strong>Macros:</strong> {dieta.macronutrients.join(", ")}
              </p>

              <p>
                <strong>Ingredientes:</strong> {dieta.ingredients.join(", ")}
              </p>

              <div className="actions">
                <button onClick={() => editExistingDieta(idx)}>Editar</button>
                <button onClick={() => deleteDieta(idx)}>Deletar</button>
              </div>
            </div>
          ))}

          <button className="create-btn" onClick={() => setModalOpen(true)}>
            Criar Dieta para este aluno
          </button>
        </>
      )}

      {modalOpen && (
        <DietaModal
          editDieta={editDieta}
          onClose={() => {
            setModalOpen(false);
            setEditDieta(null);
            setCurrentDietaIndex(null);
          }}
          onSave={handleSaveDieta}
        />
      )}

      <style>{`
        .container { max-width: 900px; margin: auto; padding: 20px; }
        .select-area { margin-bottom: 20px; }
        select { padding: 8px; border-radius: 5px; border: 1px solid #ccc; }
        .dieta-card {
          border: 1px solid #ddd;
          background: #fafafa;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 15px;
        }
        .dieta-header { display: flex; justify-content: space-between; }
        .actions button {
          padding: 6px 12px;
          margin-right: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .actions button:first-child { background: #ffc107; }
        .actions button:last-child { background: #ff4444; color: #fff; }
        .create-btn {
          padding: 10px 15px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          margin-top: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
