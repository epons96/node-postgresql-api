const { Router} = require('express');
const router = Router();

const { getUsers, createUser, getUsersById, updateUser, deleteUser } = require('../controllers/users.controller');
const { getAplicaciones, getAplicaionById, createAplicacion }= require('../controllers/aplicacion.controller')

//users
router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('users/:id', deleteUser)

//aplicacion
router.get('/aplicacion', getAplicaciones);
router.get('/aplicacion/:id', getAplicaionById);
router.post('/aplicacion', createAplicacion);


module.exports = router;