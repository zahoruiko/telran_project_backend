const { request } = require('express');
const express = require('express');
const Product = require('../database/models/product');

const router = express.Router();



router.get('/all', (req, res) =>{
    
    async function all(){
        const all = await Product.findAll();
        console.log(all);
        res.json(all);
    }
    all();
})


router.get('/:id', async (req, res) =>{
    const {id} = req.params;

    if (isNaN(id)){
        res.json({status: 'ERR', message: 'wrong id'}); 
        return  
    }
    const one = await Product.findOne({where: {id: +id}});

    if(one === null){
        res.json({status: 'ERR', message: 'Product not found'});
        return
    }
    
    res.json(one);
})


router.get('/add/:title/:price/:discont_price/:description', (req, res) =>{
    const {title, price, discont_price, description} = req.params;
    Product.create({title, price, discont_price, description, categoryId: 1});
    res.json(`добавлено`);
})

module.exports = router;
