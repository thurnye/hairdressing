const mongoose = require('mongoose');
const {Schema} = mongoose;


const productsSchema = new Schema({

    brandName:{type: String},
    currentSku: {
      imageAltText:{type: String},
      isAppExclusive: {type: Boolean},
      isBI: {type: Boolean},
      isBest: {type: Boolean},
      isFirstAccess: {type: Boolean},
      isLimitedEdition: {type: Boolean},
      isLimitedTimeOffer: {type: Boolean},
      isNatural: {type: Boolean},
      isNew: {type: Boolean},
      isOnlineOnly: {type: Boolean},
      isOrganic: {type: Boolean},
      isSephoraExclusive: {type: Boolean},
      listPrice:{type: Number},
      salePrice:{type: String},
      skuId:{type: String},
      skuImages: [Object],
      skuType:{type: String},
    },
    displayName:{type: String},
    heroImage:{type: String},
    image135:{type: String},
    image250:{type: String},
    image450:{type: String},
    productId:{type: String},
    productName:{type: String},
    rating:{type: String},
    reviews:{type: String},
    targetUrl:{type: String},
    category: {type: String}
  
})

module.exports = mongoose.model('Products', productsSchema);