"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css'; 

const LoginProfessor: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/treinadores/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Erro ao logar');
        setLoginFailed(true);
        return;
      }

      // Se seu backend retornar token, guarda no localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      setLoginFailed(false);
      setErrorMessage('');
      router.push('/pages/A/treino'); // redireciona após login
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro de conexão com o servidor');
      setLoginFailed(true);
    }
  };

  return (
    <div className="container">
      <main className="formContainer">
        <h2>Login do Professor</h2>
        <p>Acesse sua conta para continuar</p>
        <form onSubmit={handleLogin}>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
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
              placeholder="Digite sua senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btnPrimary">Entrar</button>

          {loginFailed && <p className="errorMessage">{errorMessage}</p>}

          <p className="loginLink">
            Não tem uma conta?{' '}
            <button
              type="button"
              className="redLink"
              onClick={() => router.push('/pages/A/criar_conta/professor')}
            >
              Cadastre-se
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
