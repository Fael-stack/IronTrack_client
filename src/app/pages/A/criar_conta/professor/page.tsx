"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

const CriarContaProfessor: React.FC = () => {
  const [certification, setCertification] = useState(''); // CREF
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!certification || !name || !email || !password || !age) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/treinadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certification,
          name,
          email,
          password,
          age: Number(age), // converte para número
          payment_info: {
            card_number: "",
            card_expiry: "",
            card_cvv: ""
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Erro ao cadastrar professor.');
        return;
      }

      setSuccessMessage('Professor cadastrado com sucesso!');
      setErrorMessage('');

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
            <label htmlFor="certification">CREF (Certificação)</label>
            <input
              type="text"
              id="certification"
              placeholder="Insira seu CREF"
              value={certification}
              onChange={e => setCertification(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="name">Nome completo</label>
            <input
              type="text"
              id="name"
              placeholder="Insira seu nome"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="age">Idade</label>
            <input
              type="number"
              id="age"
              placeholder="Insira sua idade"
              value={age}
              onChange={e => setAge(e.target.value)}
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

          <button type="submit" className="btnPrimary">Cadastrar</button>

          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          {successMessage && <p className="successMessage">{successMessage}</p>}
        </form>
      </main>
    </div>
  );
};

export default CriarContaProfessor;
