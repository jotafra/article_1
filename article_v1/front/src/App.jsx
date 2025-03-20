import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./screen/Cadastro";
import Home from "./screen/home";
import Cadastroout from "./screen/Cadastroout";
import Showrankingbr from "./screen/showrankingbr";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroout" element={<Cadastroout />} />
        <Route path="/show" element={<Showrankingbr />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;