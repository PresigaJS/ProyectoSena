// Rutas para autenticación

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Registro
router.post('/register', async (req, res) => {
  const { nombre, correo, contraseña, proveedor, id_proveedor } = req.body;
  const db = req.db;

  try {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    await db.query('INSERT INTO Usuarios (nombre, correo, contraseña, proveedor, id_proveedor) VALUES (?, ?, ?, ?, ?)', 
    [nombre, correo, hashedPassword, proveedor, id_proveedor]);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  const db = req.db;

  try {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
