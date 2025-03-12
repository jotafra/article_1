const router = require('express').Router()

const userController = require("../controllers/userController");

//Rotas userController
router.post('/user', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/user', userController.getAllUsers);
//router.get('/user/:cpf', userController.getxUserById); 
router.put('/user', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router