import { Link } from 'react-router-dom'
import style from './Header.module.css'

function Header() {
    return(
        <header className={style.header}>
            <span>IronTrak</span>

            <nav>
                <Link to="/treinador">treinador  </Link>
                <a href="/">Conta</a>
                <a href="/dieta">Dieta</a>
                <a href="/treino">treino</a>
            </nav>
        </header>
        
    )
}
export default Header