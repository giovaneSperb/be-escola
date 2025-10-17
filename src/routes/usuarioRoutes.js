const express = require('express');
const router = express.Router();
const { criarUsuario, loginUsuario, listarUsuarios } = require('../controllers/usuarioController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/login', loginUsuario);
router.get('/usuarios', verificarToken, listarUsuarios); 
router.post('/usuarios', verificarToken, criarUsuario);

module.exports = router;