const router = require('express').Router();

// Importe o controlador correto
const prioridadeout = require('../controllers/prioridadeout');
const prioridadebr = require('../controllers/prioridadebr');
const filterbr = require('../controllers/filterbr');

// Rotas para prioridades
router.post('/prioridadesbr', prioridadebr.prioridadesbr);
router.post('/prioridadesout', prioridadeout.prioridadesout);

router.post('/buscar-universidades', filterbr.filterbr);

module.exports = router;