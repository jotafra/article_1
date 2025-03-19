const router = require('express').Router();

// Importe o controlador correto
const prioridadeout = require('../controllers/prioridadeout');
const prioridadebr = require('../controllers/prioridadebr');

// Rotas para prioridades
router.post('/prioridadebr', prioridadebr.prioridadesbr);
router.post('/prioridadeout', prioridadeout.prioridadesout);
router.get('/teste', (req, res) => {
    res.status(200).json({ ok: "TESTE" });
  });
  


module.exports = router;