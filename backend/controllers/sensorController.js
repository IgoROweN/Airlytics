
// controller/sensorController.js

const SensorData = require('../models/sensorData');
const {validateSensorData}=require('../middewares/validation')

// GET todos os dados de sensores
exports.getAllSensorData = async (req, res) => {
  try {
    const sensorData = await SensorData.find();
    res.json(sensorData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao recuperar os dados dos sensores.' });
  }
};

// GET dados de sensores por ID
exports.getSensorDataById = async (req, res) => {
  try {
    const sensorData = await SensorData.findById(req.params.id);
    if (!sensorData) {
      return res.status(404).json({ message: 'Dados do sensor não encontrados.' });
    }
    res.json(sensorData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao recuperar os dados do sensor.' });
  }
};

// POST novos dados de sensores
exports.createSensorData = async (req, res) => {
  const errors = validateSensorData(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { humidity, temperature, mq_sensor_value, mq_voltage, timestamp } = req.body;
  try {
    const newSensorData = new SensorData({
      humidity,
      temperature,
      mq_sensor_value,
      mq_voltage,
      timestamp
    });
    const savedData = await newSensorData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar os dados do sensor.' });
  }
};

// PUT atualiza dados do sensor por ID (substitui todos os campos)
exports.updateSensorData = async (req, res) => {
  const errors = validateSensorData(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const updatedSensorData = await SensorData.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedSensorData) {
      return res.status(404).json({ message: 'Dados do sensor não encontrados.' });
    }
    res.json(updatedSensorData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar os dados do sensor.' });
  }
};

// PATCH atualização parcial de dados do sensor por ID
exports.partialUpdateSensorData = async (req, res) => {
  try {
    const updatedSensorData = await SensorData.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedSensorData) {
      return res.status(404).json({ message: 'Dados do sensor não encontrados.' });
    }
    res.json(updatedSensorData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar os dados do sensor.' });
  }
};

// DELETE dados do sensor por ID
exports.deleteSensorData = async (req, res) => {
  try {
    const deletedSensorData = await SensorData.findByIdAndDelete(req.params.id);
    if (!deletedSensorData) {
      return res.status(404).json({ message: 'Dados do sensor não encontrados.' });
    }
    res.json({ message: 'Dados do sensor excluídos com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir os dados do sensor.' });
  }
};
