import { BrowserRouter, Routes, Route } from "react-router-dom";
import Conta from "./pages/conta"; // sem espaço
import Dieta from "./pages/dieta";
import Treinador from "./pages/treinador";
import Treino from "./pages/treino";
import Pag404 from "./pages/Pag404";
import Informacoes_Pessoais from "./pages/informacoes_pessoais";
import Criar_Conta from "./pages/criar_conta";
import Notificacoes from "./pages/notificacoes";
import Seguranca from "./pages/seguranca";
import Redefinir_Senha_email from "./pages/redefinir_senha_email";
import Redefinir_Senha from "./pages/redefinir_senha";
import Account_Settings from "./pages/account_settings";
import Dieta_Diaria from "./pages/dieta_diaria";

import Login from './pages/login/login.tsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Conta />} />
        <Route path="/dieta" element={<Dieta />} />
        <Route path="/treinador" element={<Treinador />} />
        <Route path="/treino" element={<Treino />} />
        <Route path="*" element={<Pag404/>} />
        <Route path="/informacoes_pessoais" element={<Informacoes_Pessoais />} />
        <Route path="/criar_conta" element={<Criar_Conta/>} />
        <Route path="/notificacoes" element={<Notificacoes/>} />
        <Route path="/seguranca" element={<Seguranca/>} />
        <Route path="/redefinir_senha_email" element={<Redefinir_Senha_email/>} />
        <Route path="/redefinir_senha" element={<Redefinir_Senha/>} />
        <Route path="/account_settings" element={<Account_Settings/>}/>
        <Route path="/dieta_diaria" element={<Dieta_Diaria/>}/>
        <Route path="/login" element={<Login/>}/>
        


      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
