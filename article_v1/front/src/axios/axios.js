import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: { accept: "application/json" },
});

const sheets = {
  postprioridadesbr: (prioridadesbr) => api.post("prioridadesbr/", prioridadesbr),
  postprioridadesout: (prioridadesout) => api.post("prioridadesout/", prioridadesout), 

  buscarUniversidades: (data) => api.post('/buscar-universidades', data)
};

export default sheets;