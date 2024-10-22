// routes/sensorRoutes.js

const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// Definição das rotas para o CRUD
router.get('/', sensorController.getAllSensorData);        // Rota para obter todos os dados dos sensores
router.get('/:id', sensorController.getSensorDataById);    // Rota para obter dados de um sensor específico por ID
router.post('/', sensorController.createSensorData);       // Rota para criar novos dados de sensor
router.put('/:id', sensorController.updateSensorData);     // Rota para atualizar dados de um sensor por ID (substituição completa)
router.patch('/:id', sensorController.partialUpdateSensorData); // Rota para atualizar parcialmente dados de um sensor por ID
router.delete('/:id', sensorController.deleteSensorData);  // Rota para deletar dados de um sensor por ID

module.exports = router;
