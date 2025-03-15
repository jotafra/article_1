import axios from "axios"
import prioridadesbr from "../Cadastro/Cadastro";

const api = axios.create({
    baseURL:"http://localhost:5000/api/",
    headers:{"accept":"application/json"}
})
const sheets = { 
    postprioridadesbr:(postprioridadesbr) => api.post("require/", postprioridadesbr),
}
export default sheets;

