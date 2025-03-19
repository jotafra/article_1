const router = require('express').Router();

// Importe o controlador correto
const prioridadeout = require('../controllers/prioridadeout');
const prioridadebr = require('../controllers/prioridadebr');
const UniversidadesRanking = require("../controllers/universidadesRanking");

// Rotas para prioridades
router.post('/prioridadebr', prioridadebr.prioridadesbr);
router.post('/prioridadeout', prioridadeout.prioridadesout);
router.post("/ranking", UniversidadesRanking.rankUniversidades);

module.exports = router;