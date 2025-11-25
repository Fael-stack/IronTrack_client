"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import io from "socket.io-client";
import styles from "./page.module.css";

interface Usuario {
  _id: string;
  nome?: string;
  name?: string;
}

interface Remetente {
  _id: string;
  nome?: string;
  name?: string;
}

interface Mensagem {
  _id?: string;
  conteudo: string;
  remetente: Remetente | string;
  remetenteModel: "Aluno" | "Treinador";
  horario?: string;
  data?: string;
}

interface Contrato {
  _id: string;
  aluno: Usuario;
  treinador: Usuario;
  status: string;
}

const socket = io("http://localhost:4000");

export default function ChatWhatsApp() {
  const router = useRouter();
  const { id } = useParams();

  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [nomeOutroUsuario, setNomeOutroUsuario] = useState("");

  // Carregar user
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setRole(localStorage.getItem("role") || localStorage.getItem("userType"));
  }, []);

  // Carregar contratos
  useEffect(() => {
    if (!userId || !role) return;

    const buscar = async () => {
      const res = await axios.get<Contrato[]>("http://localhost:4000/contracts");

      let filtrados =
        role === "Aluno"
          ? res.data.filter(c => c.aluno?._id === userId)
          : res.data.filter(c => c.treinador?._id === userId);

      setContratos(filtrados);
    };

    buscar();
  }, [userId, role]);

  // Carregar mensagens quando um contrato é selecionado
  useEffect(() => {
    if (!id) return;

    const carregar = async () => {
      const res = await axios.get(`http://localhost:4000/chats/contract/${id}`);
      setMensagens(res.data.mensagens || []);
    };

    carregar();

    socket.emit("joinRoom", { salaId: id });

    socket.on("receiveMessage", msg => {
      setMensagens(prev => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", { salaId: id });
    };
  }, [id]);

  // Nome do outro usuário
  useEffect(() => {
    if (!id || !userId) return;

    const buscarContrato = async () => {
      const res = await axios.get(`http://localhost:4000/contracts/${id}`);
      const c: Contrato = res.data;

      const outro = c.aluno._id === userId ? c.treinador : c.aluno;

      setNomeOutroUsuario(outro.nome || outro.name || "Usuário");
    };

    buscarContrato();
  }, [id, userId]);

  const enviarMensagem = () => {
    if (!novaMensagem.trim() || !id || !userId || !role) return;

    const msg: Mensagem & { salaId: string } = {
      salaId: String(id),
      conteudo: novaMensagem,
      remetente: userId,
      remetenteModel: role === "Aluno" ? "Aluno" : "Treinador",
      horario: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    socket.emit("sendMessage", msg);
    setNovaMensagem("");
  };

  const deletarContrato = async (contratoId: string) => {
    try {
      await axios.delete(`http://localhost:4000/contracts/${contratoId}`);

      // Remove da sidebar
      setContratos(prev => prev.filter(c => c._id !== contratoId));

      // Redireciona se estiver na conversa deletada
      if (String(id) === String(contratoId)) {
        router.push("/chat");
      }
    } catch (err) {
      console.error("Erro ao deletar contrato", err);
    }
  };

  return (
    <div className={styles.container}>
      
      <aside className={styles.sidebar}>
        <header className={styles.sidebarHeader}>
          Seus Contatos
        </header>

        <div className={styles.contactList}>
          {contratos.map(c => {
            const outro =
              c.aluno._id === userId ? c.treinador : c.aluno;

            return (
              <div
                key={c._id}
                className={`${styles.contactItem} ${id === c._id ? styles.activeContact : ""}`}
              >
                <div
                  className={styles.contactInfo}
                  onClick={() => router.push(`/chat/${c._id}`)}
                >
                  <strong>{outro.nome || outro.name}</strong>
                  <p>Chat ativo</p>
                </div>

                <button
                  className={styles.deleteButton}
                  onClick={() => deletarContrato(c._id)}
                >
                  ✖
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      
      <main className={styles.chatArea}>
        {id ? (
          <>
            <header className={styles.chatHeader}>
              {nomeOutroUsuario}
            </header>

            <div className={styles.messages}>
              {mensagens.map(m => {
                const remetenteId =
                  typeof m.remetente === "string"
                    ? m.remetente
                    : m.remetente._id;

                const isMe = remetenteId === userId;

                return (
                  <div
                    key={m._id}
                    className={isMe ? styles.msgRight : styles.msgLeft}
                  >
                    <div className={isMe ? styles.bubbleRight : styles.bubbleLeft}>
                      {m.conteudo}
                      <div className={styles.time}>{m.horario}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className={styles.footer}>
              <input
                value={novaMensagem}
                onChange={e => setNovaMensagem(e.target.value)}
                onKeyDown={e => e.key === "Enter" && enviarMensagem()}
                placeholder="Digite sua mensagem"
                className={styles.input}
              />
              <button onClick={enviarMensagem} className={styles.sendBtn}>
                Enviar
              </button>
            </footer>
          </>
        ) : (
          <div className={styles.noChat}>
            Selecione um contato para começar
          </div>
        )}
      </main>
    </div>
  );
}
