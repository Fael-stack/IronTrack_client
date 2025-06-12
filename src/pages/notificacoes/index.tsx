import React from 'react';
import { FaBell, FaRegClock, FaTrashAlt } from 'react-icons/fa'; 
import styles from './notificacoes.module.css';


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

const notificacoes: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* como a gente tem um header já, substituir aqui dps */}

      <header className={styles.header}>
        <div className={styles.logo}>Iron track</div>
        <nav className={styles.nav}>
          <ul>
            <li>Dashboard</li>
            <li>Treinos</li>
            <li>Dieta</li>
            <li>Perfil</li>
          </ul>
        </nav>
        <div className={styles.profileSection}>

          <FaBell className={styles.profileIcon} />
          <div className={styles.avatar}></div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>Notificações</h1>

        <div className={styles.notificationsList}>
          {notifications.map((notification) => (
            <div key={notification.id} className={styles.notificationItem}>
              <div className={styles.notificationLeft}>
                <FaBell className={styles.iconBell} />
                <span>{notification.message}</span>
              </div>
              <div className={styles.notificationRight}>
                <FaRegClock className={styles.iconClock} />
                <span className={styles.time}>{notification.time}</span>
                <button className={styles.deleteButton} aria-label={`Remover notificação ${notification.message}`}>
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

export default notificacoes;