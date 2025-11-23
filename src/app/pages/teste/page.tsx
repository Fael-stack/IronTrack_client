'use client'

import { useState, useEffect } from 'react'

export default function TesteAvatarPage() {
  const [preview, setPreview] = useState<string | null>(null)

  // Efeito para recuperar a foto de perfil salva no localStorage quando a página é carregada, so que nao funciona
  useEffect(() => {
    const savedAvatarUrl = localStorage.getItem('avatarUrl')
    if (savedAvatarUrl) {
      setPreview(savedAvatarUrl)
    }
  }, []) 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    // Salva no localStorage para o Header usar
    localStorage.setItem('avatarUrl', imageUrl)

    setPreview(imageUrl)
  }

  return (
    <div style={{ padding: '30px' }}>
      <h1>Teste de Upload de Foto de Perfil</h1>

      <p>Selecione uma imagem e veja se o Header muda:</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {preview && (
        <div style={{ marginTop: '20px' }}>
          <h3>Pré-visualização:</h3>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #444'
            }}
          />
        </div>
      )}

      <p style={{ marginTop: '20px', color: 'gray' }}>
        * a foto atualiza ao entrar em qualquer página.
      </p>
    </div>
  )
}
