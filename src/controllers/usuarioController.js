const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const criarUsuario = async (req, res) => {
  const {
    nome,
    email,
    senha,
    tipo,
    data_nascimento,
    cpf,
    sexo,
    nome_mae,
    cpf_mae,
    nome_pai,
    cpf_pai,
    telefone_mae,
    telefone_pai,
    email_mae,
    email_pai,
    naturalidade,
    cor,
    rg,
    id_tipo_usuario,
    nome_responsavel_financeiro,
    email_responsavel_financeiro,
    fone_responsavel_financeiro,
    nome_responsavel_pedagogico,
    foto
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
        tipo,
        data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
        cpf,
        sexo,
        nome_mae,
        cpf_mae,
        nome_pai,
        cpf_pai,
        telefone_mae,
        telefone_pai,
        email_mae,
        email_pai,
        naturalidade,
        cor,
        rg,
        id_tipo_usuario,
        nome_responsavel_financeiro,
        email_responsavel_financeiro,
        fone_responsavel_financeiro,
        nome_responsavel_pedagogico,
        foto
      },
    });

    const { senha: senhaDoBanco, ...usuarioSemSenha } = novoUsuario;
    res.status(201).json(usuarioSemSenha);
  } catch (error) {
    console.error(error);
    // Trata erro de unique constraint caso ocorra (ex: condição de corrida)
    if (error && error.code === 'P2002') {
      return res.status(409).json({ erro: 'Dado único já existe (provavelmente email).' });
    }
    res.status(500).json({ erro: 'Erro ao criar usuário.' });
  }
};

const listarUsuarios = async (_req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    const usuariosSemSenha = usuarios.map(({ senha, ...resto }) => resto);
    res.json(usuariosSemSenha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar usuários' });
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
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};



module.exports = { criarUsuario, loginUsuario, listarUsuarios };