"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userByEmail = users.find((user: any) => user.email === email);

    if (!userByEmail) {
      setErrorMessage('Email não cadastrado.');
      setLoginFailed(true);
      return;
    }

    if (userByEmail.password !== password) {
      setErrorMessage('Senha incorreta.');
      setLoginFailed(true);
      return;
    }

    
    localStorage.setItem('currentUser', JSON.stringify(userByEmail));
    alert(`Bem-vindo(a), ${userByEmail.firstName}!`);
    setErrorMessage('');
    setLoginFailed(false);
    router.push('/');
  };

  const handleResetPassword = () => {
    router.push('/pages/A/redefinir_senha');
  };

  return (
    <div className="container">
      
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

          {/* Mostra a mensagem de erro se login der ruim */}
          {loginFailed && <p className="errorMessage">{errorMessage}</p>}

          {loginFailed && (
            <button type="button" className="btnSecondary" onClick={handleResetPassword}>
              Esqueci minha senha
            </button>
          )}

          <p className="loginLink">
            Não tem uma conta?{' '}
            <button type="button" className="redLink" onClick={() => router.push('/pages/A/criar_conta')}>
              Criar conta
            </button>
          </p>
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
