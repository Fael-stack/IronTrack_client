import React from 'react';
import { FaBell, FaRegClock, FaTrashAlt } from 'react-icons/fa';
import './page.css'; // Changed to import a global CSS file

const Notificacoes: React.FC = () => { // Renamed component to PascalCase
  const notifications = [
    { id: '1', message: 'Beber Água', time: '14:20' },
    { id: '2', message: 'Beber Água', time: '14:20' },
    { id: '3', message: 'Beber Água', time: '14:20' },
    { id: '4', message: 'Beber Água', time: '14:20' },
    { id: '5', message: 'Beber Água', time: '14:20' },
    { id: '6', message: 'Beber Água', time: '14:20' },
    { id: '7', message: 'Beber Água', time: '14:20' },
    { id: '8', message: 'Beber Água', time: '14:20' },
    { id: '9', message: 'Beber Água', time: '14:20' },
    { id: '10', message: 'Beber Água', time: '14:20' },
    { id: '11', message: 'Beber Água', time: '14:20' },
  ];

  return (
    <div className="container">
      {/* como a gente tem um header já, substituir aqui dps */}

      <header className="header">
        <div className="logo">Iron track</div>
        <nav className="nav">
          <ul>
            <li>Dashboard</li>
            <li>Treinos</li>
            <li>Dieta</li>
            <li>Perfil</li>
          </ul>
        </nav>
        <div className="profileSection">
          <FaBell className="profileIcon" />
          <div className="avatar"></div>
        </div>
      </header>

      <main className="mainContent">
        <h1 className="title">Notificações</h1>

        <div className="notificationsList">
          {notifications.map((notification) => (
            <div key={notification.id} className="notificationItem">
              <div className="notificationLeft">
                <FaBell className="iconBell" />
                <span>{notification.message}</span>
              </div>
              <div className="notificationRight">
                <FaRegClock className="iconClock" />
                <span className="time">{notification.time}</span>
                <button className="deleteButton" aria-label={`Remover notificação ${notification.message}`}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notificacoes; // Export the renamed component