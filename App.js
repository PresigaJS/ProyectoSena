const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();

// Conexión a la base de datos
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ProyectoEventify'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// Configuración para servir archivos estáticos
app.use('/Public', express.static(path.join(__dirname, '/Public')));

// Middleware para añadir la conexión a la base de datos a las solicitudes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Rutas
const authRoutes = require('./Routes/authRoutes');
app.use('/auth', authRoutes);

const userRoutes = require('./Routes/userRoutes');
app.use('/user', userRoutes);

const adminRoutes = require('./Routes/adminRoutes');
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.render('./User/index'); // O puedes renderizar una vista
});

app.get('/Login', (req, res) => {
  res.render('Login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
