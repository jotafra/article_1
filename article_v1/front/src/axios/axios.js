import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: { accept: "application/json" },
});

const sheets = {
  postprioridadesbr: (prioridadesbr) => api.post("prioridadesbr/", prioridadesbr),
  postprioridadesout: (x) => api.post("prioridadeout/", x),
  getRanking: (idPrioridade) => api.post("ranking/", { idPrioridade }),
};

export default sheets;