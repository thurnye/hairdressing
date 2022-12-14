const Controller = require('../Controller/controller');
const ProdController = require('../Controller/ProdController');
const Data = require('../config/data')
const router = require('express').Router()

// ========Users==============
 
// create an account
router.post('/api/user', Controller.postCreateUser);

// single
router.get('/api/user/:type/:value', Controller.getAUser)

//login
router.post(`/api/user/login`, Controller.getLogin);

// // Update
// router.post('/api/user/edit/:id', Controller.postEdit);

// //Delete
// router.post('/api/user/delete/:id', Controller.postDelete);


// =============PRODUCTS==============

//Get Shop Page
router.get('/api/data', Data.getData);

router.get('/api/categories', ProdController.getCategories)
//Get Products by Page
router.post('/api/products/:page/:itemsPerPage/', ProdController.getProducts);

// // Get Filter
router.post('/api/filter/:page/:itemsPerPage', ProdController.postFilter)

// // Single Product
 router.get('/api/product/:id', ProdController.getOneProduct)



//  ======== CART ===========

// // //Get Cart
// router.get('/api/cart', ProdController.getCart)

// // // Add to Cart
// router.post('/api/cart/:id', ProdController.postAddToCart)

// // //remove from cart
// router.post('/api/cart/remove/:id', ProdController.removeCartItem)



module.exports = router;