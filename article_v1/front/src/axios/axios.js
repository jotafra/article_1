import axios from "axios"
import Home from "../screen/home";
import Cadastro from "../screen/Cadastro";

const api = axios.create({
    baseURL:"http://localhost:5000/api/",
    headers:{"accept":"application/json"}
})
const sheets = { 
    postprioridadesbr:(postprioridadesbr) => api.post("require/", postprioridadesbr),
}
export default sheets;

