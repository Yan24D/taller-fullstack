const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Usuario = require('./models/Usuario');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Ruta GET - obtener usuarios
app.get('/api/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// Ruta POST - crear usuario
app.post('/api/usuarios', async (req, res) => {
    console.log('📨 Datos recibidos:', req.body);

    const nuevo = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email
  });

  await nuevo.save();
  res.status(201).json({ mensaje: 'Usuario creado' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
