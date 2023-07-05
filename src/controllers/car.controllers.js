const catchError = require('../utils/catchError');
const Car = require('../models/Car');
const Product = require('../models/Product');
const ProductImg = require('../models/Productimg');

const getAll = catchError(async(req, res) => {
    const user = req.user
    const results = await Cart.findAll({
        include:[
            {
                model:Product,
                include:[Category,ProductImg],
            }
        ],
        where:{userId:user.id}
    });
    return res.json(results);
});
const create = catchError(async(req, res) => {

    const userId= req.user.id
    const {quantity, productId} = res.body

    const body = {userId, quantity, productId}

    const result = await Car.create(body);
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id
    const result = await Car.destroy({
        //filtrar carrito por usuario y por id del carrito
         where: {
            id, 
         userId
         }
    });
    if(!result) return res.sendStatus(404)
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    //Se limina userId y ProductId de la tabla de car para evitar que se modifiquen usurairos 
    delete req.body.userId
    delete req.body.productId
    const result = await Car.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    remove,
    update
}