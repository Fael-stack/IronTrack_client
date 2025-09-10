"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

const LoginProfessor: React.FC = () => {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codigo || !nome || !email || !senha) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/treinador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo,
          nome,
          email,
          senha
        })
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message || 'Erro ao cadastrar professor.');
        return;
      }

      setSuccessMessage('Professor cadastrado com sucesso!');
      setErrorMessage('');

      // Redireciona para a página de login do professor
      setTimeout(() => router.push('/pages/A/login/professor'), 1500);

    } catch (error) {
      console.error(error);
      setErrorMessage('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="container">
      <main className="formContainer">
        <h2>Cadastro do Professor</h2>
        <p>Preencha os dados abaixo para criar sua conta</p>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="codigo">Código</label>
            <input
              type="text"
              id="codigo"
              placeholder="Insira seu código"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              placeholder="Insira seu nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Insira seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Insira sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btnPrimary">Cadastrar</button>

          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          {successMessage && <p className="successMessage">{successMessage}</p>}

          <p className="loginLink">
            Já possui uma conta?{' '}
            <button
              type="button"
              className="redLink"
              onClick={() => router.push('/pages/A/login/professor')}
            >
              Faça login
            </button>
          </p>
        </form>
      </main>

      <footer className="footer">
        <p>© 2025 Fit Track. Todos os direitos reservados.</p>
        <div className="socialIcons">⚫ ⚫ ⚫</div>
      </footer>
    </div>
  );
};

export default LoginProfessor;