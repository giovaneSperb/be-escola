const express = require('express');
const router = express.Router();
const { criarUsuario, loginUsuario, listarUsuarios, buscarUsuarioPorId, usuarioupdate } = require('../controllers/usuarioController');
const { listarTipoUsuarios } = require('../controllers/tipousuarioController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/login', loginUsuario);
router.get('/usuarios', verificarToken, listarUsuarios); 
router.get('/usuarios/:id', verificarToken, buscarUsuarioPorId); 
router.put('/usuarios/:id', verificarToken, usuarioupdate);
router.post('/usuarios', verificarToken, criarUsuario);

router.get('/tipousuarios', verificarToken, listarTipoUsuarios); 

module.exports = router;