const express = require('express');
const router = express.Router();
const { criarUsuario, loginUsuario, listarUsuarios, buscarUsuarioPorId } = require('../controllers/usuarioController');
const { listarTipoUsuarios } = require('../controllers/tipousuarioController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/login', loginUsuario);
router.get('/usuarios', verificarToken, listarUsuarios); 
router.get('/usuarios/:id', verificarToken, buscarUsuarioPorId); 
router.post('/usuarios', verificarToken, criarUsuario);

router.get('/tipousuarios', verificarToken, listarTipoUsuarios); 

module.exports = router;