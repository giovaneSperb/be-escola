const express = require('express');
const router = express.Router();
const { criarUsuario, loginUsuario, listarUsuarios } = require('../controllers/usuarioController');

router.post('/usuarios', criarUsuario);
router.post('/login', loginUsuario);
router.get('/usuarios', listarUsuarios); 

module.exports = router;