'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './page.css'

export default function LoginTreinador() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:4000/treinadores/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
//
      if (!res.ok) {
        setError(data.message || 'Erro ao logar.')
        return
      }

      localStorage.setItem('userId', data.treinador.id)
      localStorage.setItem('token', data.token)
      localStorage.setItem('userType', 'treinador')
      localStorage.setItem('role', data.treinador.role || "Treinador");



      router.push('/pages/casa')

    } catch {
      setError('Erro no servidor.')
    }
  }

  return (
    <div className="container">
      <div className="formContainer">
        <h2>Login - treinador</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label>Senha</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btnPrimary">Entrar</button>
        </form>
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  )
}
