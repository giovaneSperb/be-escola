const express = require('express');
const router = express.Router();
const { criarUsuario, loginUsuario } = require('../controllers/usuarioController');

router.post('/usuarios', criarUsuario);
router.post('/login', loginUsuario);

module.exports = router;