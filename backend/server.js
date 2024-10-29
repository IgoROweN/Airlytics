const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configura as variáveis de ambiente
dotenv.config();

// Inicializa o app Express
const app = express();

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Conectando ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
