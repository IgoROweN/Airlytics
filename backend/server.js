const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Configura as variáveis de ambiente
dotenv.config();

// Conecta ao banco de dados
connectDB(); // Conexão ao banco de dados, se necessário

// Inicializa o app Express
const app = express();

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Conectando ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch((error) => console.error('Erro ao conectar no MongoDB:', error));

// Importa as rotas
const sensorRoutes = require('./routes/sensorRoutes');

// Definindo as rotas da API
app.use('/api/sensors', sensorRoutes);

// Configuração da porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

console.log('MongoDB URI:', process.env.MONGODB_URI);
