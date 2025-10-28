const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const criarUsuario = async (req, res) => {
  const {
    nome,
    email,
    senha,
    cpf,
    id_tipo_usuario,
    tipo
  } = req.body;

  // Validações básicas
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
  }

  const emailTratado = String(email).toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTratado)) {
    return res.status(400).json({ erro: 'Email inválido.' });
  }

  if (String(senha).length < 6) {
    return res.status(400).json({ erro: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  try {
    // Verifica se já existe usuário com o email
    const existente = await prisma.usuario.findUnique({ where: { email: emailTratado } });
    if (existente) {
      return res.status(409).json({ erro: 'Email já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email: emailTratado,
        senha: senhaHash,
        cpf,
        id_tipo_usuario,
        tipo,
      },
    });

    const { senha: senhaDoBanco, ...usuarioSemSenha } = novoUsuario;
    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    console.error(error);
    // Trata erro de unique constraint caso ocorra (ex: condição de corrida)
    if (error && error.code === 'P2002') {
      return res.status(409).json({ erro: 'Dado único já existe (provavelmente email ou CPF).' });
    }
    res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
};


const listarUsuarios = async (_req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        tipoUsuario: true, // traz a relação
      },
    });

    const usuariosSemSenha = usuarios.map(({ senha, tipoUsuario, ...resto }) => ({
      ...resto,
      tipo: tipoUsuario ? tipoUsuario.nome : null, // substitui o campo tipo
    }));

    res.json(usuariosSemSenha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
};


const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: {
        tipoUsuario: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const { senha, tipoUsuario, ...resto } = usuario;

    res.json({
      ...resto,
      tipo: tipoUsuario ? tipoUsuario.nome : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
};


const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.id_tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.id_tipo_usuario } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};

  // ✅ Atualizar usuario
const usuarioupdate = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, senha, cpf, id_tipo_usuario, tipo } = req.body;
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: Number(id) },
        data: { nome, email, senha, cpf, id_tipo_usuario, tipo },
      });
      res.json(usuarioAtualizado);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuario", details: error.message });
    }
};

module.exports = { criarUsuario, loginUsuario, listarUsuarios, buscarUsuarioPorId, usuarioupdate };