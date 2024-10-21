const SerialPort = require('serialport').SerialPort; // Importando SerialPort
const { ReadlineParser } = require('@serialport/parser-readline'); // Importando o parser
const { MongoClient } = require('mongodb');

// Configuração da porta serial
const port = new SerialPort({ path: 'COM6', baudRate: 9600 }); // Definindo o caminho da porta
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

const uri =
  'mongodb+srv://PedroMoreira27:Zubumafu%40123@crud.amjibhv.mongodb.net/sensordata?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function connectToDB() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
  }
}

connectToDB();

// Função para salvar os dados no MongoDB
async function saveToMongo(data) {
  try {
    const database = client.db('sensordata'); // Nome do banco de dados
    const collection = database.collection('readings'); // Nome da coleção

    // Inserir os dados no MongoDB
    await collection.insertOne(data);
    console.log('Dados salvos no MongoDB:', data);
  } catch (err) {
    console.error('Erro ao salvar no MongoDB', err);
  }
}

// Leitura dos dados da porta serial
parser.on('data', (line) => {
  console.log(`Dados recebidos: ${line}`);

  // Tenta converter a linha para JSON
  try {
    const data = JSON.parse(line);

    // Enviar para o MongoDB
    saveToMongo(data);
  } catch (err) {
    console.error('Erro ao processar JSON:', err);
  }
});

// Fechar a conexão com o MongoDB ao encerrar o programa
process.on('SIGINT', async () => {
  await client.close();
  console.log('Conexão com o MongoDB encerrada');
  process.exit(0);
});
