import React, { useState } from 'react';
import { FaHeartbeat, FaEye, FaEyeSlash, FaInfoCircle } from 'react-icons/fa';
import styles from './redefinir_senha.module.css'; 

const redefinir_senha: React.FC = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <div className={styles.logoSection}>
          <FaHeartbeat className={styles.logoIcon} />
          <span className={styles.logoText}>Iron track</span>
        </div>

        <h1 className={styles.title}>Redefinir Senha</h1>

        <div className={styles.formGroup}>
          <label htmlFor="newPassword" className={styles.label}>Nova Senha</label>
          <div className={styles.inputWrapper}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              className={styles.inputField}
              placeholder="Digite sua nova senha"
            />
            <span className={styles.togglePassword} onClick={toggleNewPasswordVisibility}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmNewPassword" className={styles.label}>Confirmar Nova Senha</label>
          <div className={styles.inputWrapper}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              className={styles.inputField}
              placeholder="Confirme sua nova senha"
            />
            <span className={styles.togglePassword} onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className={styles.passwordHint}>
          <FaInfoCircle className={styles.infoIcon} />
          <span>A senha deve ter no mínimo 8 caracteres</span>
        </div>

        <button className={styles.submitButton}>
          Redefinir Senha
        </button>

        <a href="#" className={styles.backToLoginLink}>Voltar ao Login</a>

        <p className={styles.helpText}>
          Precisa de ajuda? <a href="#" className={styles.contactLink}>Entre em contato</a>
        </p>
      </div>
    </div>
  );
};

export default redefinir_senha;