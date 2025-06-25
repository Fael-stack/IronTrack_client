"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userFound = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (userFound) {
      localStorage.setItem('currentUser', JSON.stringify(userFound));
      alert(`Bem-vindo(a), ${userFound.firstName}!`);

      // Redireciona para a atual página inicial
      router.push('/');
    } else {
      alert('Email ou senha incorretos.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">❤️ Iron track</div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>
      </header>

      <main className="formContainer">
        <h2>Entrar na conta</h2>
        <p>Acesse sua conta para continuar</p>

        <form onSubmit={handleLogin}>
          <div className="formGroup">
            <label htmlFor="email">Endereço de email</label>
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
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Insira sua senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btnPrimary">Entrar</button>

          <p className="loginLink"> Não tem uma conta?{' '}
            <button type="button" className="redLink" onClick={() =>
             router.push('/pages/A/criar_conta')}> Criar conta </button> </p>

        </form>
      </main>

      <footer className="footer">
        <p>© 2025 Fit track. Todos os direitos reservados.</p>
        <div className="socialIcons">⚫ ⚫ ⚫</div>
      </footer>
    </div>
  );
};

export default Login;
