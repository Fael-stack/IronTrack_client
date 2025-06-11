import React, { useState } from 'react';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
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

    alert('Conta criada com sucesso!');
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

      <main className="form-container">
        <h2>Crie uma conta</h2>
        <p>Join us to track and improve your health journey</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
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

            <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
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

          <label className="checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            Eu concordo com os <a href="#">Termos de serviço</a> e <a href="#">Política de privacidade</a>
          </label>

          <button type="submit" className="btn-primary">Criar conta</button>

          <p className="login-link">
            Já possui uma conta? <a href="#" className="red-link">Faça login</a>
          </p>

          <div className="social-buttons">
            <button type="button" className="btn-social google">G Entrar com Google</button>
            <button type="button" className="btn-social apple"> Entrar com Apple</button>
          </div>
        </form>
      </main>

      <footer className="footer">
        <p>© 2025 Fit track. Todos os direitos reservados.</p>
        <div className="social-icons">⚫ ⚫ ⚫</div>
      </footer>
    </div>
  );
};

export default SignupForm;
