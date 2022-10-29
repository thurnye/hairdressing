//the shop has to have the product model 
const User = require('../model/userModel')
const Products = require('../model/prodModel')
const Category = require('../Model/categoriesModel')
const Order= require('../model/orderModel');
const { response } = require('express');




const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        const prod = await Products.find();
        const allBrands = []
        for(let p in prod){
            allBrands.push(prod[p].brandName)
            
        }
        const brands = [...new Set(allBrands)].sort();
        res.status(200).json({
            categories,
            brands,
        })
    } catch (error) {
        res.status(500).json({
            category:[],
            brands:[],
            user: '',
        })
    }
}

// Get Products
const getProducts = async (req, res, next) => {
    try{
            const page = parseInt(req.params.page) || 1
            const perPage = parseInt(req.params.itemsPerPage) || 24
            const {category, search} = req.body
            // const cat = category.split('&')
            console.log(page, perPage, category, search)
            const prod = await Products.find({
                ...search && {displayName: { $regex: `${search}` }},
                ...category && {category: {
                        $regex: `${category}`,
                        // $regex: cat[1]
                    }},
            });

            const minMax = await Products.aggregate([
                { "$group": {
                   "_id": null,
                   "MaximumValue": { "$max": "$currentSku.listPrice" },
                }}
             ]);
             console.log('MinMax', minMax[0].MaximumValue)
            
            // for quering the next filter page, so as not to throw an error in product page
            // const query = {    
            //     retailPrice: {  $gte: Number(req.body.minAmount) || 0, $lte: Number(req.body.maxAmount) || 5000},
            // } 
        // pagination
        await Products
        .find({
           ...search && {displayName: { $regex: `${search}` }},
           ...category && {category: {
                $regex: `${category}`,
                // $regex: cat[1]
            }},

        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            // console.log(products)
            res.status(200).json({
                dataLength: prod.length/perPage + 1,
                products,
                user: '',
                maximumPrice: minMax[0].MaximumValue,
            })
        })
} catch (err) {
    res.status(500).json({
        products: [],
        user: '',
    })
   }

}


// Filter Search
const postFilter = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1
        const perPage = parseInt(req.params.itemsPerPage) || 24
        const{
            minPrice,
            maxPrice,
            brand,
        } = req.body

        console.log('Query', req.body)

        // query for min-max prices
        const  query = {    
            "currentSku.listPrice": {  $gte: Number(minPrice) || 0, $lte: Number(maxPrice) || 5000},
        } 
         // check for brand
        if (brand){
            query.brandName = new RegExp(brand, 'i')
        }

        const prod = await Products.find(query);

        console.log(prod.length)


        // pagination
        await Products
        .find(query)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            // console.log(products)
            res.status(200).json({
                dataLength: prod.length/perPage + 1,
                products,
                user: '',
                presentFilter: req.body
            })
        })
       
    } catch (err) {
        console.log(err)
    }
}




// Single Product
const getOneProduct = async (req, res) => {

    // try{
    //     const prodId = req.params.id
    //     // console.log(prodId)
    //     const product = await Products.findById(prodId)
    //     // console.log(product)
    //     res.render('shop/product', {
    //         title: 'Simpleton',
    //         product: product,
    //         user: req.user
    //     })
    // }catch (err) {
    //     console.log(err)
    // }

}


// ADD TO CART
const postAddToCart = async (req, res) => {
    // console.log( req.user)
    // try{
    //     if (req.user) {
    //         const userId = req.user._id   
    //         const prodId = req.body.prodId
    //         const quantity = req.body.quantity
    //         const price = req.body.price
    //         // console.log(userId)
    //         // console.log(prodId)
    //         // console.log(quantity)
    //         // console.log(price)
    //         //check to see if product exist and increase the quantity
    //         User.findById(userId, (err, user) => {
    //             // console.log(user.cart)
    //             let foundProd;
    //             if (user.cart.length === 0){
    //                 // total price for the product
    //                 // console.log(quantity)
    //                 const total = parseInt(quantity) * parseInt(price)
    //                 const newItem = {
    //                     product : prodId,
    //                     quantity: parseInt(quantity),
    //                     totalPrice: parseInt(total)
    //                 }
    //                 user.cart.push(newItem)
    //                 return user.save((err)=>{
    //                     if(err) { 
    //                         console.log(err)  
    //                     }else{  res.redirect('/shop/cart')
    //                     }
    //                 })
    //             }


    //             //  if product exist
    //             for (let i=0; i < user.cart.length; i++) {
    //                 // console.log(console.log(i))
    //                 if (user.cart[i].product._id.toString() === prodId.toString()) {
    //                     // console.log('found at position',user.cart[i])
    //                     foundProd = user.cart[i];
    //                 }
    //             } 

    //             //if it does not, create new one
    //             if(!foundProd){ 
    //                 // console.log('create a new product')
    //                 // total price for the product
    //                 const total = parseInt(quantity) * parseInt(price)
    //                 const newItem = {
    //                     product : prodId,
    //                     quantity: parseInt(quantity),
    //                     totalPrice: parseInt(total)
    //                 }
    //                 user.cart.push(newItem)
    //                 user.save((err)=>{
    //                     err ? err : res.redirect('/shop/cart')
    //                 })
    //             }

    //             // if found
    //             if(foundProd){
    //                 let cartQuantity = foundProd.quantity
    //                 updatedQuantity = parseInt(req.body.quantity) + parseInt(cartQuantity)
    //                 foundProd.quantity = updatedQuantity
    //                  // total price for the product
    //                 const total = parseInt(updatedQuantity) * parseInt(price)
    //                 foundProd.totalPrice = total

    //                 user.save((err)=>{
    //                     if(err) { 
    //                         console.log(err)  
    //                     }else{  
    //                         res.redirect('/shop/cart')
    //                     }
    //                 })
    //             }  
    //         })
    //     }else{
    //         //if no user redirect to login
    //         res.redirect('/auth/google')
    //     } 
    // }catch (err) {
    //     console.log(err)
    // }
}




// GET CART
const getCart = async (req, res, next) => {
    
    // try{
    //     if (req.user){
    //         // console.log(result)
    //           await User.findById(req.user._id).populate('cart.product').exec( (err, user) => {
    //             console.log(user)
    //             // subTotal price
    //             let subtotal = 0;
    //             user.cart.forEach(el => {
    //                subtotal += parseInt(el.totalPrice)
    //             })
    //             // console.log(subtotal)
    //             res.render('shop/cart', { 
    //                 title: 'Simpleton',
    //                 user: req.user,
    //                 cart: user.cart,
    //                 length: user.cart.length,
    //                 subtotal: subtotal,
    //              })
    //         });
    //     }
    //     else {
    //         res.render('shop/cart', { 
    //             title: 'Simpleton',
    //             user: req.user,
    //             products: []
    //         })
    //     }
    // } catch (err) {
    //     console.log(err)
    // }

}



//remove product from the array
const removeCartItem = async (req, res) => {
    // try {
    //     const prodId = req.body.prodId
    //     User.findById(req.user._id, (err, user) => {
    //         // console.log(user.cart)
    //         for (let i=0; i < user.cart.length; i++) {
    //             if (user.cart[i].product._id.toString() === prodId.toString()) {
                    
    //                 user.cart[i].remove()
    //                 user.save((err)=>{
    //                     if(err) { 
    //                         console.log(err)  
    //                     }else{  res.redirect('/shop/cart')
    //                     }
                         
    //                  })
    //             }
    //         }
    //     })
    // }catch(err) {
    //     console.log(err)
    // }
}




module.exports = {
    getCategories,
    getProducts,
    getOneProduct,
    postAddToCart,
    getCart,
    removeCartItem,
    postFilter,
    

}