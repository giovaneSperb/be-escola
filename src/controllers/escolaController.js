const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports  = {
  // ✅ Listar todas as escolas
  async index(req, res) {
    try {
      const escolas = await prisma.escola.findMany();
      res.json(escolas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar escolas", details: error.message });
    }
  },

  // ✅ Buscar escola por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const escola = await prisma.escola.findUnique({ where: { id: Number(id) } });
      if (!escola) return res.status(404).json({ error: "Escola não encontrada" });
      res.json(escola);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar escola", details: error.message });
    }
  },

  // ✅ Criar nova escola
  async store(req, res) {
    try {
      const { nome, cnpj, endereco } = req.body;
      const novaEscola = await prisma.escola.create({
        data: { nome, cnpj, endereco },
      });
      res.status(201).json(novaEscola);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar escola", details: error.message });
    }
  },

  // ✅ Atualizar escola
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, cnpj, endereco } = req.body;
      const escolaAtualizada = await prisma.escola.update({
        where: { id: Number(id) },
        data: { nome, cnpj, endereco },
      });
      res.json(escolaAtualizada);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar escola", details: error.message });
    }
  },

  // ✅ Deletar escola
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await prisma.escola.delete({ where: { id: Number(id) } });
      res.json({ message: "Escola removida com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar escola", details: error.message });
    }
  },
};
