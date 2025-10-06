"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

type Aluno = { _id: string; nome: string };
type Treinador = { _id: string; nome: string };
type Contract = { _id: string; aluno: string; treinador: string; status: string };

export default function TreinadorContratosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [treinadores, setTreinadores] = useState<Treinador[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [treinadorSelecionado, setTreinadorSelecionado] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alunosRes, treinadoresRes, contractsRes] = await Promise.all([
          axios.get<Aluno[]>("http://localhost:4000/alunos"),
          axios.get<Treinador[]>("http://localhost:4000/treinadores"),
          axios.get<Contract[]>("http://localhost:4000/contracts"),
        ]);
        setAlunos(alunosRes.data);
        setTreinadores(treinadoresRes.data);
        setContracts(contractsRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    fetchData();
  }, []);

  const treinador = treinadores.find(t => t._id === treinadorSelecionado);
  const contratosDoTreinador = contracts.filter(c => c.treinador === treinadorSelecionado);

  const alunosComContrato = alunos.filter(a => contratosDoTreinador.some(c => c.aluno === a._id));
  const alunosSemContrato = alunos.filter(a => !contratosDoTreinador.some(c => c.aluno === a._id));

  const criarContrato = async (alunoId: string) => {
    if (!treinadorSelecionado || !alunoId) return;
    try {
      await axios.post("http://localhost:4000/contracts", { aluno: alunoId, treinador: treinadorSelecionado, status: "ativo" });
      const { data } = await axios.get<Contract[]>("http://localhost:4000/contracts");
      setContracts(data);
    } catch (error: any) {
      console.error("Erro ao criar contrato:", error.response?.data || error.message);
    }
  };

  const removerContrato = async (contratoId: string) => {
    try {
      await axios.delete(`http://localhost:4000/contracts/${contratoId}`);
      setContracts(contracts.filter(c => c._id !== contratoId));
    } catch (error: any) {
      console.error("Erro ao remover contrato:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <h2>Treinadores</h2>
        <div className={styles.customSelect}>
          <div className={styles.selected} onClick={() => setOpen(!open)}>
            {treinadorSelecionado ? treinador?.nome : "Selecione um treinador"}
            <span className={styles.arrow}>▼</span>
          </div>
          {open && (
            <ul className={styles.options}>
              {treinadores.map(t => (
                <li
                  key={t._id}
                  onClick={() => {
                    setTreinadorSelecionado(t._id);
                    setOpen(false);
                  }}
                >
                  {t.nome}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <main className={styles.main}>
        {treinador ? (
          <div className={styles.contractLists}>
            <div className={styles.contractColumn}>
              <h2>Com contrato</h2>
              <ul className={styles.contractList}>
                {alunosComContrato.map(a => {
                  const contrato = contratosDoTreinador.find(c => c.aluno === a._id);
                  return (
                    <li key={a._id} className={styles.contractItem}>
                      {a.nome}
                      <button className={styles.removeBtn} onClick={() => removerContrato(contrato?._id!)}>
                        Remover
                      </button>
                    </li>
                  );
                })}
                {alunosComContrato.length === 0 && <li className={styles.emptyState}>Nenhum contrato ainda.</li>}
              </ul>
            </div>

            <div className={styles.contractColumn}>
              <h2>Disponíveis</h2>
              <ul className={styles.contractList}>
                {alunosSemContrato.map(a => (
                  <li key={a._id} className={styles.contractItem}>
                    {a.nome}
                    <button className={styles.addBtn} onClick={() => criarContrato(a._id)}>
                      Adicionar
                    </button>
                  </li>
                ))}
                {alunosSemContrato.length === 0 && <li className={styles.emptyState}>Todos já estão contratados.</li>}
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>Selecione um treinador para visualizar contratos.</div>
        )}
      </main>
    </div>
  );
}
