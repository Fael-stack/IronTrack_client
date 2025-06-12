import React from 'react';
import { FaHeartbeat, FaEnvelope, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import styles from './redefinir_email.module.css'; 

const redefinir_senha_email: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <div className={styles.logoSection}>
          <FaHeartbeat className={styles.logoIcon} />
          <span className={styles.logoText}>Iron track</span>
        </div>

        <h1 className={styles.title}>Redefinir Senha</h1>
        <p className={styles.subtitle}>
          Insira seu email para enviarmos um link para redefinição da senha
        </p>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Endereço de email</label>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              id="email"
              className={styles.inputField}
              placeholder="Insira seu email"
            />
          </div>
        </div>

        <button className={styles.submitButton}>
          <FaPaperPlane className={styles.buttonIcon} />
          Enviar link de redefinição
        </button>

        <div className={styles.backToLogin}>
          <FaArrowLeft className={styles.backIcon} />
          <a href="#" className={styles.backLink}>Voltar ao login</a>
        </div>

        <p className={styles.helpText}>
          Precisa de ajuda? <a href="#" className={styles.contactLink}>Contate o suporte</a>
        </p>
      </div>
    </div>
  );
};

export default redefinir_senha_email;