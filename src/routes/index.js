const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.routes');
const routerProduct = require('./product.router');
const routerCar = require('./car.routes');
const router = express.Router();

router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/cart', routerCar)



module.exports = router;