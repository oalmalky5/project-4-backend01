const express = require('express')

const router = express.Router();

const Product = require('../models/product')


const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })

// get request 
// show products created by  that specific user
router.get('/products',requireToken,(req, res,next) => {
    const userId = req.user.id
    Product.find({'owner':userId})
         .sort({date: -1})
        .then(products => {
            res.status(200).json({products:products})
        })
        .catch(next)
});

// The RegExp constructor creates a regular expression object for matching text with a pattern.
router.get('/products/search',(req, res,next) => {
    const name = req.query.name
    Product.find({'name': new RegExp(name, "i")})
         .sort({date: -1})
        .then(products => {
            console.log(products)
            res.status
            (200).json({products:products})
        })
        .catch(next)
});

router.get('/products/:id', requireToken, (req, res, next) => {
    Product.findById(req.params.id)
      .then(handle404)
      .then(product => {
        requireOwnership(req, product)
      
        res.status(200).json({ product: product.toObject() })
      })
      .catch(next)
  })
  
// index 
// show all products created  
router.get('/productsAll',(req, res,next) => {
    Product.find()
        .then(products => {
            res.status(200).json({products:products})
        })
        .catch(next)
});


// post request
router.post('/products',requireToken , (req, res,next) => {
    const user = req.user.id
    const product = req.body.product
    product.owner = user

    Product.create(product)
    .then((product) => {
        res.status(201).json({product:product})
    })
    .catch(next)
}) 

// // show =>  for userid
// router.get('/product/:id',requireToken,(req,res,next) => {
//     const productId = req.params.id
//     Product.findById(productId)
//     .then(handle404)
//     .then((product) => {
//         requireOwnership(req.product)
//         res.status(200).json({product:product})
//     })
//     .catch(next)
// })

router.put('/products/:id', requireToken,(req,res,next) => {
    const productId = req.params.id;
    const updateProduct = req.body.product;


    Product.findById(productId)
    .then(handle404)
    .then((product) => {
        // requireOwnership(req, product)
        return product.update(updateProduct)
    })
    .then(() => res.sendStatus(201))
    .catch(next)
})

router.delete('/products/:id', requireToken, (req, res, next) => {
    const productId = req.params.id
    Product.findById(productId)
        .then(handle404)
        .then(product => {
            // requiredOwnership(req, product)
            product.remove(productId)
        })

        .then(() => res.sendStatus(204))
        .catch(next)
})




module.exports = router;