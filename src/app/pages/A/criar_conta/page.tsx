'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import './page.css';

const CriarConta: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const router = useRouter(); 

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

    // redireciona para a página de login
    router.push('/pages/A/login');

  };

  return (
    <div className="container">
      <main className="formContainer">
        <h2>Crie uma conta</h2>
        <p>Comece agora sua rotina para uma vida mais saudável!</p>

        <form onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formGroup">
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

            <div className="formGroup">
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

          <div className="formGroup">
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

          <div className="formGroup">
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

          <div className="formGroup">
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

          <button type="submit" className="btnPrimary">Criar conta</button>
          <p className="loginLink">
              Já possui uma conta?{' '}
               <button type="button" className="redLink" onClick={() => 
               router.push('/pages/A/login')}>Faça Login</button> </p>
          
        </form>
      </main>

      <footer className="footer">
        <p>© 2025 Fit track. Todos os direitos reservados.</p>
        <div className="socialIcons">⚫ ⚫ ⚫</div>
      </footer>
    </div>
  );
};

export default CriarConta;