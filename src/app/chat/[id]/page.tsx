"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import io from "socket.io-client";
import axios from "axios";

interface Mensagem {
  remetente: string;
  remetenteModel: "Aluno" | "Treinador";
  conteudo: string;
  data?: string;
  horario?: string;
}

const socket = io("http://localhost:4000");

export default function ChatPage() {
  const { id } = useParams(); // id do contrato
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [nomeOutroUsuario, setNomeOutroUsuario] = useState("");

  // userId e role do localStorage
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setRole(localStorage.getItem("role"));
  }, []);

  // 🔹 Carrega mensagens e entra na sala
  useEffect(() => {
    if (!id) return;

    const salaId = Array.isArray(id) ? id[0] : id;

    const carregarMensagens = async () => {
      try {
        const res = await axios.get<{ mensagens: Mensagem[] }>(
          `http://localhost:4000/chats/contract/${salaId}`
        );
        setMensagens(res.data.mensagens || []);
      } catch (err) {
        console.error("Erro ao carregar mensagens:", err);
      }
    };

    carregarMensagens();

    socket.emit("joinRoom", { salaId });

    // Recebe mensagens novas do servidor
    socket.on("receiveMessage", (msg: Mensagem) => {
      setMensagens((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", { salaId });
    };
  }, [id]);

  // 🔹 Carrega nome do outro usuário (aluno ou treinador)
  useEffect(() => {
    const carregarContrato = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/contracts/${id}`);
        const contrato = res.data;

        if (userId === contrato.aluno._id) {
          // Se for o aluno logado, mostrar nome do treinador
          setNomeOutroUsuario(contrato.treinador.nome || contrato.treinador.name || "Treinador");
        } else {
          // Se for o treinador logado, mostrar nome do aluno
          setNomeOutroUsuario(contrato.aluno.nome || contrato.aluno.name || "Aluno");
        }
      } catch (err) {
        console.error("Erro ao carregar contrato:", err);
      }
    };

    if (userId) carregarContrato();
  }, [id, userId]);

  // 🔹 Enviar mensagem
  const enviarMensagem = () => {
    if (!novaMensagem.trim() || !userId || !role) return;

    const salaId = Array.isArray(id) ? id[0] : id;

    const mensagem: Mensagem & { salaId: string } = {
      salaId: salaId!,
      remetente: userId!,
      remetenteModel: role === "Aluno" ? "Aluno" : "Treinador",
      conteudo: novaMensagem,
      horario: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Envia mensagem para o servidor (que depois retransmite via "receiveMessage")
    socket.emit("sendMessage", mensagem);

    setNovaMensagem("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        border: "1px solid #ccc",
      }}
    >
      <header
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          textAlign: "center",
        }}
      >
        Conversa com {nomeOutroUsuario || "Usuário"}
      </header>

      <main style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {mensagens.length === 0 && (
          <p style={{ textAlign: "center", color: "#888" }}>
            Nenhuma mensagem ainda.
          </p>
        )}
        {mensagens.map((msg, i) => {
          const isMeu = msg.remetente === userId;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: isMeu ? "flex-end" : "flex-start",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  backgroundColor: isMeu ? "#007bff" : "#e5e5ea",
                  color: isMeu ? "white" : "black",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                  {isMeu ? "Você" : nomeOutroUsuario}
                </div>
                <div>{msg.conteudo}</div>
                <div
                  style={{
                    fontSize: "10px",
                    textAlign: "right",
                    marginTop: "2px",
                  }}
                >
                  {msg.horario ||
                    (msg.data
                      ? new Date(msg.data).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "")}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <footer
        style={{
          display: "flex",
          borderTop: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <input
          type="text"
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          placeholder="Digite sua mensagem..."
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "15px 0 0 15px",
            outline: "none",
          }}
        />
        <button
          onClick={enviarMensagem}
          style={{
            padding: "8px 16px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "0 15px 15px 0",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </footer>
    </div>
  );
}
