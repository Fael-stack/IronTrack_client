'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="headerLeft">
        <span className="headerLogoText">Iron Track</span>
      </div>

      <nav className="headerNav">
        <ul className="navList">
          <li>
            <Link href="/pages/A/casa" className="navLink">Home</Link>
          </li>
          <li>
            <Link href="/pages/A/treino" className="navLink">Treinos</Link>
          </li>
          <li>
            <Link href="/pages/U/dieta" className="navLink activeLink">Dieta</Link>
          </li>
          <li>
            <Link href="/pages/A/account_settings" className="navLink">Perfil</Link>
          </li>
        </ul>
      </nav>

      <div className="headerRight">
        <div className="headerAvatarPlaceholder"></div>
        <div className="headerOtherAvatar"></div>
      </div>
    </header>
  );
}
