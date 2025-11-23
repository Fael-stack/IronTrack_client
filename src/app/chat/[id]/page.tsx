"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import io from "socket.io-client";
import axios from "axios";

// Interface do remetente pode ser string(ID) ou objeto completo
interface Remetente {
  _id: string;
  nome?: string;
  name?: string;
}

interface Mensagem {
  remetente: Remetente | string; 
  remetenteModel: "Aluno" | "Treinador";
  conteudo: string;
  data?: string;
  horario?: string;
  _id?: string;
}

interface Usuario {
  _id: string;
  nome?: string;
  name?: string;
}

interface Contrato {
  aluno: Usuario;
  treinador: Usuario;
}

const socket = io("http://localhost:4000");

export default function ChatPage() {
  const { id } = useParams(); 
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [nomeOutroUsuario, setNomeOutroUsuario] = useState("");

  // Pega  userId e role do localStorage
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setRole(localStorage.getItem("userType")); // aluno ou treinador
  }, []);

  //  Carrega mensagens e entra na sala
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

    socket.on("receiveMessage", (msg: Mensagem) => {
      setMensagens((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", { salaId });
    };
  }, [id]);

  //  Carrega nome do outro usuário (aluno ou treinador)
  useEffect(() => {
    if (!id || !userId || !role) return;

    const carregarContrato = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/contracts/${id}`);
        const contrato: Contrato = res.data; 

        if (userId === contrato.aluno._id) {
          setNomeOutroUsuario(contrato.treinador.nome || contrato.treinador.name || "Treinador");
        } else {
          setNomeOutroUsuario(contrato.aluno.nome || contrato.aluno.name || "Aluno");
        }
      } catch (err) {
        console.error("Erro ao carregar contrato:", err);
      }
    };

    carregarContrato();
  }, [id, userId, role]);


  const enviarMensagem = () => {
    if (!novaMensagem.trim() || !userId || !role) return;

    const salaId = Array.isArray(id) ? id[0] : id;

    const mensagem: Mensagem & { salaId: string } = {
      salaId: salaId!,
      remetente: userId,
      remetenteModel: role === "aluno" ? "Aluno" : "Treinador",
      conteudo: novaMensagem,
      horario: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    socket.emit("sendMessage", mensagem);
    setNovaMensagem("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", border: "1px solid #ccc" }}>
      <header style={{ padding: "10px", backgroundColor: "#007bff", color: "white", textAlign: "center" }}>
        Conversa com {nomeOutroUsuario || "Usuário"}
      </header>

      <main style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {mensagens.length === 0 && <p style={{ textAlign: "center", color: "#888" }}>Nenhuma mensagem ainda.</p>}

        {mensagens.map((msg) => {
          
          const remetenteId = typeof msg.remetente === "object" ? msg.remetente._id : msg.remetente;
          const isMeu = String(remetenteId) === String(userId);

          return (
            <div key={msg._id} style={{ display: "flex", justifyContent: isMeu ? "flex-end" : "flex-start", marginBottom: "8px" }}>
              <div style={{ maxWidth: "70%", padding: "8px 12px", borderRadius: "15px", backgroundColor: isMeu ? "#007bff" : "#e5e5ea", color: isMeu ? "white" : "black" }}>
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{isMeu ? "Você" : nomeOutroUsuario}</div>
                <div>{msg.conteudo}</div>
                <div style={{ fontSize: "10px", textAlign: "right", marginTop: "2px" }}>
                  {msg.horario || (msg.data ? new Date(msg.data).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "")}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <footer style={{ display: "flex", borderTop: "1px solid #ccc", padding: "10px" }}>
        <input
          type="text"
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          placeholder="Digite sua mensagem..."
          style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "15px 0 0 15px", outline: "none" }}
        />
        <button onClick={enviarMensagem} style={{ padding: "8px 16px", border: "none", backgroundColor: "#007bff", color: "white", borderRadius: "0 15px 15px 0", cursor: "pointer" }}>
          Enviar
        </button>
      </footer>
    </div>
  );
}
