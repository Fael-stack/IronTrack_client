import React, { useState } from 'react';
import styles from './criar_conta.module.css';

const CriarConta: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!formData.agree) {
      alert('Você precisa aceitar os termos para continuar.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const emailExists = existingUsers.some(
      (user: any) => user.email === formData.email
    );

    if (emailExists) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    alert('Conta criada com sucesso!');
    // Opcional: redirecionar para login ou limpar o formulário
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
        <h2>Crie uma conta</h2>
        <p>Join us to track and improve your health journey</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">Primeiro Nome</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Insira seu primeiro nome"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName">Último Nome</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Insira seu último nome"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Endereço de email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Insira seu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Insira uma senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmação de senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            Eu concordo com os <a href="#">Termos de serviço</a> e <a href="#">Política de privacidade</a>
          </label>

          <button type="submit" className={styles.btnPrimary}>Criar conta</button>

          <p className={styles.loginLink}>
            Já possui uma conta? <a href="#" className={styles.redLink}>Faça login</a>
          </p>

          <div className={styles.socialButtons}>
            <button type="button" className={styles.btnSocial}>G Entrar com Google</button>
            <button type="button" className={styles.btnSocial}> Entrar com Apple</button>
          </div>
        </form>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Fit track. Todos os direitos reservados.</p>
        <div className={styles.socialIcons}>⚫ ⚫ ⚫</div>
      </footer>
    </div>
  );
};

export default CriarConta;
