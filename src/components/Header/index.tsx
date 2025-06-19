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
                <a href="/informacoes_pessoais">info</a>
                <a href="/criar_conta">criar</a>
                <a href="/notificacoes">noti</a>
                <a href="/seguranca">segu</a>
                <a href="/redefinir_senha_email">senha-email</a>
                <a href="/redefinir_senha">senha</a>
                <a href="/account_settings">acc</a>
                <a href="/dieta_diaria">diar</a>
                <a href="/login">login</a>


            </nav>
        </header>
        
    )
}
export default Header