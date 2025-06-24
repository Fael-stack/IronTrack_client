'use client';
import React, { useState } from 'react';
import { FaHeartbeat, FaEye, FaEyeSlash, FaInfoCircle } from 'react-icons/fa';
import './page.css'; // Changed to import a global CSS file

const RedefinirSenha: React.FC = () => { // Renamed component to PascalCase
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="pageContainer">
      <div className="card">
        <div className="logoSection">
          <FaHeartbeat className="logoIcon" />
          <span className="logoText">Iron track</span>
        </div>

        <h1 className="title">Redefinir Senha</h1>

        <div className="formGroup">
          <label htmlFor="newPassword" className="label">Nova Senha</label>
          <div className="inputWrapper">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              className="inputField"
              placeholder="Digite sua nova senha"
            />
            <span className="togglePassword" onClick={toggleNewPasswordVisibility}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="confirmNewPassword" className="label">Confirmar Nova Senha</label>
          <div className="inputWrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              className="inputField"
              placeholder="Confirme sua nova senha"
            />
            <span className="togglePassword" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="passwordHint">
          <FaInfoCircle className="infoIcon" />
          <span>A senha deve ter no mínimo 8 caracteres</span>
        </div>

        <button className="submitButton">
          Redefinir Senha
        </button>

        <a href="#" className="backToLoginLink">Voltar ao Login</a>

        <p className="helpText">
          Precisa de ajuda? <a href="#" className="contactLink">Entre em contato</a>
        </p>
      </div>
    </div>
  );
};

export default RedefinirSenha; // Export the renamed component