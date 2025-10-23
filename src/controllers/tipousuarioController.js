const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const listarTipoUsuarios = async (_req, res) => {
  try {
    const tipousuarios = await prisma.tipoUsuario.findMany();
    res.json(tipousuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
};

module.exports = { listarTipoUsuarios };