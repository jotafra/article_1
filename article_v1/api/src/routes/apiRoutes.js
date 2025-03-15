const router = require('express').Router()

const user_priority = require("../controllers/user_priority");

//Rotas userController
router.post('/user', user_priority.prioridade);
//router.post('/login', userController.loginUser);
//router.get('/user', userController.getAllUsers);
//router.get('/user/:cpf', userController.getxUserById); 
//router.put('/user', userController.updateUser);
//router.delete('/user/:id', userController.deleteUser);

module.exports = router