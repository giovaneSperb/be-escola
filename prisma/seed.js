const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.tipoUsuario.createMany({
    data: [
      { nome: 'admin' },
      { nome: 'secretaria' },
      { nome: 'professor' },
      { nome: 'aluno' },
    ],
    skipDuplicates: true, // evita erro se já existirem
  });
}

main()
  .then(() => {
    console.log('Seed concluído com sucesso!');
  })
  .catch((e) => {
    console.error('Erro ao rodar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });