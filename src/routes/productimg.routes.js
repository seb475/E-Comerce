const { getAll, create, remove,  } = require('../controllers/productimg.controller');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require("../utils/verifyJWT")

const productimgRouter = express.Router();

productimgRouter.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT,upload.array('image'), create)

productimgRouter.route('/:id')
    .delete(verifyJWT,remove)
    

module.exports = productimgRouter;