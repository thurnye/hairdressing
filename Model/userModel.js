var mongoose = require('mongoose');
const {Schema} = mongoose


const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  imageUrl: String,
  googleId: String,
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
      },
      quantity: {
        type: Number,
      },
      totalPrice: {
        type: Number,
      }
    }
  ],
  wishlist: [{

  }]
}, 

{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);