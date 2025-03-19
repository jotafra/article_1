const router = require('express').Router();

// Importe o controlador correto
const prioridadeout = require('../controllers/prioridadeout');
const prioridadebr = require('../controllers/prioridadebr');

// Rotas para prioridades
router.post('/prioridadebr', prioridadebr.prioridadesbr);
router.post('/prioridadeout', prioridadeout.prioridadesout);

// Rotas comentadas (mantidas para referência)
//router.post('/login', userController.loginUser);
//router.get('/user', userController.getAllUsers);
//router.get('/user/:cpf', userController.getxUserById); 
//router.put('/user', userController.updateUser);
//router.delete('/user/:id', userController.deleteUser);

module.exports = router;