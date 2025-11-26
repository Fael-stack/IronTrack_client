'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from "next/navigation";
import AccountSettings from '@/app/pages/account_settings/page';

type User = {
  id: string
  nome?: string
  name?: string
  email?: string
  avatarUrl?: string
}

export default function Header() {
  const pathname = usePathname();
  const hiddenRoutes = [
    '/pages/login/aluno',
    '/pages/login/treinador',
    '/pages/criar_conta/aluno',
    '/pages/criar_conta/treinador',
    '/pages/redefinir_senha',
    '/pages/redefinir_senha_email',
    '/pages/tela_log',
    '/'

  ];
  if (hiddenRoutes.includes(pathname)) { return null; }


  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<'aluno' | 'treinador' | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const type = localStorage.getItem('userType') as 'aluno' | 'treinador' | null

    if (!token || !type) return

    setUserType(type)

    const fetchUser = async () => {
      try {
        const endpoint =
          type === 'treinador'
            ? 'http://localhost:4000/treinadores/auth/me'
            : 'http://localhost:4000/alunos/auth/me'

        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error('Não autorizado')

        const data = await res.json()
        setUser(data)
      } catch (err) {
        console.error('Erro ao buscar usuário no Header:', err)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }

  const storedAvatar = typeof window !== 'undefined' ? localStorage.getItem('avatarUrl') : null
  const avatarUrl = storedAvatar || user?.avatarUrl || '/default-avatar.png'


  // Links dinâmicos de contratos
  const contratosLink =
    userType === 'treinador' ? '/pages/contratos/treinador' : '/pages/contratos/aluno'

  const treinosLink =
    userType === 'treinador' ? '/pages/treino/treinador' : '/pages/treino';

  const dietaLink =
    userType === 'treinador' ? '/pages/dieta/treinador' : '/pages/dieta';

  return (
    <header className="header">
      <div className="headerLeft">
        <span className="headerLogoText">Iron Track</span>
      </div>

      <nav className="headerNav">
        <ul className="navList">
          <li><Link href="/pages/casa" className="navLink">Home</Link></li>
          <li><Link href={treinosLink} className="navLink">Treinos</Link></li>
          <li><Link href={dietaLink} className="navLink">Dieta</Link></li>
          <li><Link href="/pages/account_settings" className="navLink">Perfil</Link></li>
          <li><Link href="/pages/chat" className="navLink">Chat</Link></li>
          <li><Link href={contratosLink} className="navLink">Contratos</Link></li>
        </ul>
      </nav>

      <div className="headerRight">
        {user ? (
          <>
            <div className="headerUserInfo">
              <span className="userName">{user.nome || user.name || 'Usuário'}</span>
              <button onClick={handleLogout} className="logoutBtn">Sair</button>
            </div>
            <img
              src={avatarUrl}
              alt="Avatar"
              className="headerAvatar"
              onError={(e) => (e.currentTarget.src = '/default-avatar.png')}
              
            />
          </>
        ) : (
          <Link href="/pages/login/aluno" className="navLink">Entrar</Link>
        )}
      </div>  

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 30px;
          background-color: #f3f3f3ff;
          color: white;
        }

        .headerLogoText {
          font-size: 22px;
          font-weight: bold;
          color: #000000ff;
        }

        .navList {
          display: flex;
          list-style: none;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .navLink {
          color: white;
          text-decoration: none;
        }

        .navLink:hover {
          color: #f04e23;
        }

        .headerRight {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .headerAvatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .headerUserInfo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .userName {
          font-weight: 600;
          color: #000000ff;
        }

        .logoutBtn {
          background: #f04e23;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          color: white;
          cursor: pointer;
        }

        .logoutBtn:hover {
          background: #d63b1c;
        }

        @media (max-width: 768px) {
          .navList {
            gap: 10px;
          }
          .headerLogoText {
            font-size: 20px;
          }
          .headerAvatar {
            width: 35px;
            height: 35px;
          }
        }

        @media (max-width: 480px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 20px;
          }
          .navList {
            flex-wrap: wrap;
            gap: 8px;
          }
        }
      `}</style>
    </header>
  )
}
