// models/SensorData.js

const mongoose = require('mongoose');

// Definindo o schema para os dados do sensor
const sensorDataSchema = new mongoose.Schema({
  humidity: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  mq_sensor_value: {
    type: Number,
    required: true,
  },
  mq_voltage: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Cria o modelo baseado no schema
const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
