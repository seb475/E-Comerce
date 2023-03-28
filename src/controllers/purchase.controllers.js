const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const results = await Purchase.findAll({ where: {userId}});
    return res.json(results);
});
   
const purchaseCart = catchError(async(req, res) => {
     const cart = await Cart.findAll({
        where: {userId: req.user.id},
        attributes: ["quantity", "productId", "userId"],
        raw:true
     })
     await Purchase.bulkCreate(cart)
     await Cart.destroy({where: {userId: req.user.id}})

    return res.json(cart);
});



module.exports = {
    getAll,
    purchaseCart
}