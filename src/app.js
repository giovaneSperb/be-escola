const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fileURLToPath = require("url");

const path = require("path");

const usuarioRoutes = require('./routes/usuarioRoutes');
const escolaRoutes = require('./routes/escolaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api', usuarioRoutes);
app.use('/api', escolaRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API da Escola está rodando!');
});

const { exec } = require('child_process');

app.post('/run-migrations', async (req, res) => {
  exec('npx prisma generate', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro: ${error.message}`);
      return res.status(500).send('Erro ao rodar migrations');
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Erro ao rodar migrations');
    }
    console.log(`stdout: ${stdout}`);
    res.send('Migrations aplicadas com sucesso!');
  });
});


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});