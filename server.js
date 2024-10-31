const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./app/config/database.js');
const authRoutes = require('./app/routes/authRoutes.js');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
