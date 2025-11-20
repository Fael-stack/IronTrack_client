"use client";

import React, { useEffect, useState } from "react";
import TreinoModal from "@/components/Modal/TreinoModal";

interface Exercise {
    _id?: string;
    name: string;
    details: string;
    completed: boolean;
}

interface Treino {
    _id?: string | null;
    name: string;
    day_time: string;
    week_day: string;
    exercises: Exercise[];
}

interface Aluno {
    _id: string;
    name: string;
}

export default function TreinosTreinadorPage() {
    const [token, setToken] = useState<string | null>(null);
    const [treinadorId, setTreinadorId] = useState<string | null>(null);

    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [selectedAluno, setSelectedAluno] = useState<string>("");

    const [treinos, setTreinos] = useState<Treino[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editTreino, setEditTreino] = useState<Treino | null>(null);
    const [currentTreinoIndex, setCurrentTreinoIndex] = useState<number | null>(null);

    // ============================================
    // 1️⃣ CARREGA TOKEN + TREINADOR ID DO LOCALSTORAGE
    // ============================================
    useEffect(() => {
        const t = localStorage.getItem("token");
        const id = localStorage.getItem("userId");

        console.log("token →", t);
        console.log("treinadorId →", id);

        setToken(t);
        setTreinadorId(id);
    }, []);

    // ============================================
    // 2️⃣ BUSCA ALUNOS DO TREINADOR
    // ============================================
    useEffect(() => {
        if (!token || !treinadorId) return;

        (async () => {
            try {
                const res = await fetch(`http://localhost:4000/contracts/treinador/${treinadorId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();
                console.log("Alunos retornados pelo backend →", data);

                if (Array.isArray(data)) {
                    setAlunos(data);
                } else {
                    console.error("Backend NÃO retornou array de alunos:", data);
                    alert(data.error || "Erro ao buscar alunos.");
                    setAlunos([]);
                }
            } catch (error) {
                console.error("Erro ao buscar alunos:", error);
                setAlunos([]);
            }
        })();
    }, [token, treinadorId]);

    // ============================================
    // 3️⃣ CARREGA TREINOS DO ALUNO SELECIONADO
    // ============================================
    useEffect(() => {
        if (!token || !selectedAluno) return;

        (async () => {
            try {
                const res = await fetch(`http://localhost:4000/treinos/treinador/user/${selectedAluno}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();
                console.log("Treinos retornados pelo backend →", data);

                if (Array.isArray(data)) {
                    setTreinos(data);
                } else {
                    console.error("Backend NÃO retornou array de treinos:", data);
                    setTreinos([]);
                }
            } catch (err) {
                console.error("Erro ao buscar treinos:", err);
                setTreinos([]);
            }
        })();
    }, [token, selectedAluno]);

    // ============================================
    // 4️⃣ SALVAR OU EDITAR TREINO
    // ============================================
    const handleSaveTreino = async (treinoInput: Omit<Treino, "_id">) => {
        if (!token || !selectedAluno) return alert("Aluno ou token faltando.");

        try {
            let response;
            if (editTreino && currentTreinoIndex !== null && editTreino._id) {
                response = await fetch(`http://localhost:4000/treinos/treinador/${editTreino._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...treinoInput, userId: selectedAluno }),
                });
            } else {
                response = await fetch("http://localhost:4000/treinos/treinador", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...treinoInput, userId: selectedAluno }),
                });
            }

            const saved = await response.json();
            if (!response.ok) throw new Error(saved.error || "Erro ao salvar treino.");

            if (editTreino && currentTreinoIndex !== null) {
                const updated = [...treinos];
                updated[currentTreinoIndex] = saved;
                setTreinos(updated);
            } else {
                setTreinos(prev => [...prev, saved]);
            }

            setEditTreino(null);
            setCurrentTreinoIndex(null);
            setModalOpen(false);
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Erro desconhecido.");
        }
    };

    const editExistingTreino = (idx: number) => {
        setEditTreino(treinos[idx]);
        setCurrentTreinoIndex(idx);
        setModalOpen(true);
    };

    const deleteTreino = async (idx: number) => {
        if (!token) return;
        const treino = treinos[idx];
        try {
            const res = await fetch(`http://localhost:4000/treinos/treinador/${treino._id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Erro ao deletar treino.");
            setTreinos(prev => prev.filter((_, i) => i !== idx));
        } catch (err) {
            console.error(err);
            alert("Erro ao deletar treino.");
        }
    };

    // ============================================
    // 5️⃣ RENDER
    // ============================================
    return (
        <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
            <h1>Treinos dos Alunos</h1>

            <div style={{ marginBottom: 20 }}>
                <label>Selecione um aluno:</label>
                <select value={selectedAluno} onChange={e => setSelectedAluno(e.target.value)}>
                    <option value="">Escolha um aluno</option>
                    {alunos.map(a => (
                        <option key={a._id} value={a._id}>
                            {a.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedAluno && (
                <>
                    <h2>Treinos de {alunos.find(a => a._id === selectedAluno)?.name}</h2>

                    {treinos.map((t, idx) => {
                        const completed = t.exercises?.filter(e => e.completed).length || 0;
                        const total = t.exercises?.length || 0;
                        const percent = total ? Math.round((completed / total) * 100) : 0;

                        return (
                            <div
                                key={t._id || idx}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: 12,
                                    borderRadius: 8,
                                    marginBottom: 12,
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h3 style={{ margin: 0 }}>{t.name}</h3>
                                    <span>{percent}%</span>
                                </div>
                                <p>
                                    {t.day_time} — {t.week_day}
                                </p>

                                <ul>
                                    {t.exercises.map((ex, i) => (
                                        <li key={ex._id ?? i}>
                                            <strong
                                                style={{
                                                    textDecoration: ex.completed ? "line-through" : "none",
                                                }}
                                            >
                                                {ex.name}
                                            </strong>{" "}
                                            ({ex.details})
                                        </li>
                                    ))}
                                </ul>

                                <div style={{ marginTop: 8 }}>
                                    <button onClick={() => editExistingTreino(idx)} style={{ marginRight: 8 }}>
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteTreino(idx)}
                                        style={{ background: "#ff4444", color: "#fff" }}
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <button onClick={() => setModalOpen(true)} style={{ marginTop: 12 }}>
                        Criar Treino para este aluno
                    </button>
                </>
            )}

            {modalOpen && (
                <TreinoModal
                    editTreino={editTreino}
                    onClose={() => {
                        setModalOpen(false);
                        setEditTreino(null);
                        setCurrentTreinoIndex(null);
                    }}
                    onSave={handleSaveTreino}
                />
            )}
        </div>
    );
}
