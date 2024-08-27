const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const alert = require('alert-node');

const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function (req, res) {
    try{
        let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body;
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });
        alert("product inserted successfully");
        res.redirect('/owners/admin');
    }catch(err){
        res.send(err.message);
    }
});

module.exports = router;