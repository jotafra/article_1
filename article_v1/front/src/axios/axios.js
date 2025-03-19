import axios from "axios"
import Home from "../screen/home";
import Cadastroout from "../screen/Cadastroout";
import Cadastro from "../screen/Cadastro";

const api = axios.create({
    baseURL:"http://localhost:5000/api/",
    headers:{"accept":"application/json"}
})
const sheets = { 
    postprioridadesbr:() => api.post("prioridadesbr/", Cadastro),
    postprioridadesout:() => api.post("prioridadesout/", Cadastroout),
}
export default sheets;

