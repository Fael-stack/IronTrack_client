import { BrowserRouter, Routes, Route } from "react-router-dom";
import Conta from "./pages/conta"; // sem espaço
import Dieta from "./pages/dieta";
import Treinador from "./pages/treinador";
import Treino from "./pages/treino";
import Pag404 from "./pages/Pag404";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Conta />} />
        <Route path="/dieta" element={<Dieta />} />
        <Route path="/treinador" element={<Treinador />} />
        <Route path="/treino" element={<Treino />} />
        <Route path="*" element={<Pag404/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
