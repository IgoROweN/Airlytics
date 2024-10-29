// middlewares/validation.js

const validateSensorData = (data) => {
    const errors = [];
    if (typeof data.humidity !== 'number' || data.humidity < 0 || data.humidity > 100) {
      errors.push('A umidade deve ser um número entre 0 e 100.');
    }
    if (typeof data.temperature !== 'number') {
      errors.push('A temperatura deve ser um número.');
    }
    if (typeof data.mq_sensor_value !== 'number') {
      errors.push('O valor do sensor MQ deve ser um número.');
    }
    if (typeof data.mq_voltage !== 'number') {
      errors.push('A voltagem do sensor MQ deve ser um número.');
    }
    return errors;
  };
  
  module.exports = { validateSensorData };
  