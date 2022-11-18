const { Router } = require('express');
const productRoute = require('./productRoute');
const categoryRoute =require('./categoryRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);}

router.use('/product', productRoute);
router.use('/category', categoryRoute);

module.exports = router;