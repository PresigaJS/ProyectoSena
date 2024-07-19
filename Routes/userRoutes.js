//  Rutas para usuarios

// Routes/userRoutes.js
const express = require('express');
const router = express.Router();


router.get('/', (req,res)=> {
  res.render('User/index')
});

router.get('/Login', (req, res)=> {
  res.render('Views/Login')
});

router.get('/dashboard', (req, res)=> {
  res.render('User/index');
});

router.get('/profile', (req, res)=> {
  res.render('User/profile');
});

router.get('/reservation', (req, res)=> {
  res.render('User/reservation');
});

module.exports = router;
