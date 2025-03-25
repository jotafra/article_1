import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from "./screen/Cadastro";
import Cadastroout from "./screen/Cadastroout";

import Home from "./screen/home";
import Showrankingbr from "./screen/showrankingbr";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroout" element={<Cadastroout />} />

        <Route path="/Showrankingbr" element={<Showrankingbr />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;