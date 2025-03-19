//estava faltando esse import
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from "./screen/Cadastro";
import Home from "./screen/home";
import Cadastroout from "./screen/Cadastroout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroout" element={<Cadastroout />} />
      </Routes>
    </BrowserRouter>

  );
}
export default App;
