const mongoose = require('mongoose');
const {Schema} = mongoose;


const productsSchema = new Schema({
    brandName: {type: String},
    currentSku: {
        badgeAltText: {type: String},
        biExclusiveLevel: {type: String},
        imageAltText: {type: String},
        isAppExclusive: {
            type: Boolean
        },
        isBI: {
            type: Boolean
        },
        isBest: {
            type: Boolean
        },
        isFirstAccess: {
            type: Boolean
        },
        isLimitedEdition: {
            type: Boolean
        },
        isLimitedTimeOffer: {
            type: Boolean
        },
        isNatural: {
            type: Boolean
        },
        isNew: {
            type: Boolean
        },
        isOnlineOnly: {
            type: Boolean
        },
        isOrganic: {
            type: Boolean
        },
        isSephoraExclusive: {
            type: Boolean
        },
        listPrice: {type: String},
        salePrice: {type: String},
        skuId: {type: String},
        skuImages: {
            image135: {type: String},
            image162: {type: String},
            image250: {type: String},
            image42: {type: String},
            image450: {type: String},
            image62: {type: String},
            image97: {type: String}
        },
        skuType: {type: String},
        valuePrice: {type: String}
    },
    displayName: {type: String},
    heroImage: {type: String},
    image135: {type: String},
    image250: {type: String},
    image450: {type: String},
    productId: {type: String},
    rating: {type: String},
    reviews: {type: String},
    targetUrl: {type: String}
},)

module.exports = mongoose.model('Products', productsSchema);