"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Aluno = { _id: string; nome?: string; name?: string };
type Treinador = { _id: string; nome: string };

type Contract = {
  _id: string;
  aluno: Aluno | null;
  treinador: Treinador | null;
  status: string;
  descricao?: string;
  preco?: number;
};

export default function TreinadorContratosPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [treinadorId, setTreinadorId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Evitar erro de acesso ao localStorage no SSR
    const id = typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";
    setTreinadorId(id);
  }, []);

  useEffect(() => {
    if (!treinadorId) return;

    const fetchContracts = async () => {
      try {
        const res = await axios.get<Contract[]>("http://localhost:4000/contracts");
        const meusContratos = res.data.filter(c => c.treinador?._id === treinadorId);
        setContracts(meusContratos);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContracts();
  }, [treinadorId]);

  const abrirChat = (contractId: string) => {
    localStorage.setItem("role", "Treinador");
    router.push(`/chat/${contractId}`);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Seus Contratos</h2>
        {contracts.length === 0 && <p>Nenhum contrato ativo.</p>}
        <ul className={styles.contractList}>
          {contracts.map(c => (
            <li key={c._id} className={styles.contractItem}>
              {c.aluno?.nome || c.aluno?.name || "Aluno não identificado"}

              {c.status === "ativo" && (
                <button onClick={() => abrirChat(c._id)}>Abrir Chat</button>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
