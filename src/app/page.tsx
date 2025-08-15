"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Bem-vindo(a) ao Fit Track!</h1>
        <p className={styles.subtitle}>Escolha uma das opções abaixo para continuar:</p>

        <div className={styles.actions}>
          <button 
            className={styles.btnPrimary} 
            onClick={() => router.push('/pages/A/criar_conta/professor')}
          >
            Professor
          </button>

          <button 
            className={styles.btnSecondary} 
            onClick={() => router.push('/pages/A/login')}
          >
            Aluno
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2025 Fit Track. Todos os direitos reservados.</p>
        <div className={styles.socialIcons}>⚫ ⚫ ⚫</div>
      </footer>
    </div>
  );
};

export default Home;
