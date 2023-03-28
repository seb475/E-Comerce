const express = require('express');
const cartRouter = require('./cart.routes');
const categoryRouter = require('./category.routes');
const productRouter = require('./product.routes');
const productimgRouter = require('./productimg.routes');
const purchaseRouter = require('./purchase.routes');
const userRouter = require('./user.routes');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter)
router.use('/categories',categoryRouter)
router.use('/products', productRouter)
router.use('/product_images', productimgRouter)
router.use('/cart', cartRouter)
router.use('/purchases', purchaseRouter)

module.exports = router;