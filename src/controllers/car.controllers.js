const catchError = require('../utils/catchError');
const Car = require('../models/Car');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const user = req.user
    const results = await Car.findAll({include :[Product], });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Car.create(req.body);
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Car.destroy({ where: {id} });
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