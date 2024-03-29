// importamos express y creamos un router
const express = require('express');
const router = express.Router();

// importamos las rutas
const userRoutes = require('./userRoutes');

// middleware que indica a express donde se encuentran las rutas de los usuarios y las notas
router.use(userRoutes);

module.exports = router;