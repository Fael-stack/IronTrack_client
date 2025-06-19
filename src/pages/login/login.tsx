import React, { useState } from 'react';
import styles from './login.module.css'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userFound = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (userFound) {
      localStorage.setItem('currentUser', JSON.stringify(userFound));
      alert(`Bem-vindo(a), ${userFound.firstName}!`);
      // Aqui você pode redirecionar para o dashboard
    } else {
      alert('Email ou senha incorretos.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>❤️ Iron track</div>
        <nav className={styles.nav}>
          <a href="#">Home</a>
          <a href="#">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>
      </header>

      <main className={styles.formContainer}>
        <h2>Entrar na conta</h2>
        <p>Acesse sua conta para continuar</p>

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

          <button type="submit" className={styles.btnPrimary}>Entrar</button>

          <p className={styles.loginLink}>
            Não tem uma conta? <a href="#" className={styles.redLink}>Criar conta</a>
          </p>
        </form>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Fit track. Todos os direitos reservados.</p>
        <div className={styles.socialIcons}>⚫ ⚫ ⚫</div>
      </footer>
    </div>
  );
};

export default Login;
