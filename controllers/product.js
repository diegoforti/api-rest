'use strict'

const Product = require('../models/product')

function getProduct (req, res){
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición`})
        if(!product) return res.status(404).send({message: `El producto no existe`})

        res.status(200).send({ product })
    })    
}

function getProducts (req, res){
    Product.find({}, (err, product) => {        
        if(err) return res.status(500).send({message: `Error al realizar la petición`})
        if(!product) return res.status(404).send({message: `El producto no existe`})

        res.send(200, {product})
    })
}

function saveProduct(req, res){
    console.log('POST api/product')
    console.log (`Request Entero, ${req}`)
    console.log (`Body del Request,  ${req.body}`)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if(err) res.status(500).send({message: `Error al salvar en BD ${err}`})

        res.status(200).send({product: productStored})

    })
}


function updateProduct (req, res){
    let productId = req.params.productId
    let update = req.body
    console.log (`Producto parametro:  ${productId}`)

    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
        if(err) return res.status(500).send({message: `Error al actualizar el producto ${productId}`})

        res.status(200).send({ product: productUpdate })
    })
}

function deleteProduct (id){
    let productId = req.params.productId
    console.log (`Producto parametro:  ${productId}`)

    Product.findById(productId, (err, product) => {        
        if(err) return res.status(500).send({message: `Error al borrar el producto ${productId}`})
        
       product.remove(err => {
           if(err) return res.status(500).send({message: `Error al borrar el producto ${productId}`})
            res.status(200).send({ message: 'El producto se borró' })
       })           
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}