// app/chat/page.tsx

import { Bell, MoreVertical, Search, SendHorizonal } from 'lucide-react';
import Image from 'next/image';
import './page.css';

// Representa um único contato na lista da sidebar
function ContactItem({ name, avatarUrl, isActive = false }: { name: string; avatarUrl: string; isActive?: boolean }) {
  const itemClasses = isActive ? "contactItem active" : "contactItem";

  return (
    <>
      <div className={itemClasses}>
        <Image src={avatarUrl} alt={`Foto de ${name}`} width={60} height={60} className="avatar" />
        <span className="contactName">{name}</span>
      </div>
      <hr className="divider" />
    </>
  );
}

// A barra lateral esquerda com a lista de contatos
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebarHeader">
        <h1 className="sidebarTitle">Personal</h1>
        <div className="notification">
          <Bell size={20} />
          <span className="badge">3</span>
        </div>
      </div>

      <div className="searchBar">
        <Search size={20} className="searchIcon" />
        <input type="text" placeholder="Pesquisar" />
      </div>

      <div className="contactList">
        {/* Aqui você pode mapear uma lista de contatos real no futuro */}
        <ContactItem name="Aluno 1" avatarUrl="/avatar-placeholder.png" isActive={true} />
        <ContactItem name="Aluno 2" avatarUrl="/avatar-placeholder.png" />
        <ContactItem name="Aluno 3" avatarUrl="/avatar-placeholder.png" />
      </div>
    </aside>
  );
}

// O cabeçalho da conversa ativa
function ChatHeader() {
  return (
    <header className="chatHeader">
      <div className="headerInfo">
        <Image src="/avatar-placeholder.png" alt="Foto do Aluno 1" width={53} height={53} className="headerAvatar" />
        <h2 className="headerTitle">Personal</h2>
      </div>
      <div className="headerActions">
        <Image src="/procurar.png" alt="ícone procurar" width={46} height={46} />
        <Image src="/opcoes.png" alt="ícone opções" width={53} height={53} />
      </div>
    </header>
  );
}

// A área para digitar e enviar a mensagem
function MessageInput() {
  return (
    <div className="inputArea">
      <input type="text" placeholder="Digite uma mensagem" className="messageInput" />
      <button className="sendButton">
        <SendHorizonal size={24} />
      </button>
    </div>
  );
}

export default function ChatPageCompleta() {
  return (
    <div className="chatLayout">
      <Sidebar />
      <main className="mainContent">
        <ChatHeader />
        <div className="messagesContainer">
          {}
          <p style={{ textAlign: 'center', color: '#999' }}>Selecione uma conversa para começar.</p>
        </div>
        <MessageInput />
      </main>
    </div>
  );
}