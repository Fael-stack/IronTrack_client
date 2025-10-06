"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

const CriarContaAluno: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage('Nome, email e senha são obrigatórios.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password, // ⚡ o backend irá criptografar com bcrypt
          age: age ? Number(age) : undefined,
          weight: weight ? Number(weight) : undefined,
          height: height ? Number(height) : undefined,
          phone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Erro ao cadastrar.');
        return;
      }

      setSuccessMessage('Cadastro realizado com sucesso!');
      setErrorMessage('');

      // Redireciona após 1,5s para login
      setTimeout(() => router.push('/pages/A/login/aluno'), 1500);

    } catch (error) {
      console.error(error);
      setErrorMessage('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="container">
      <main className="formContainer">
        <h2>Cadastro do Aluno</h2>
        <p>Preencha os dados abaixo para criar sua conta</p>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="name">Nome completo</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <div className="formGroup">
            <label htmlFor="age">Idade</label>
            <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} />
          </div>

          <div className="formGroup">
            <label htmlFor="weight">Peso (kg)</label>
            <input type="number" id="weight" value={weight} onChange={e => setWeight(e.target.value)} />
          </div>

          <div className="formGroup">
            <label htmlFor="height">Altura (cm)</label>
            <input type="number" id="height" value={height} onChange={e => setHeight(e.target.value)} />
          </div>

          <div className="formGroup">
            <label htmlFor="phone">Telefone</label>
            <input type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          <button type="submit" className="btnPrimary">Cadastrar</button>

          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          {successMessage && <p className="successMessage">{successMessage}</p>}
        </form>
      </main>
    </div>
  );
};

export default CriarContaAluno;
