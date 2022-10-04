const mongoose = require('mongoose');
const { STRING } = require('sequelize');
const {Schema} = mongoose;


const categoriesSchema = new Schema({
    displayName:{
        type: String
    },
    node:{
        type: Number
    },
    recordCount:{
        type: String
    }
})

module.exports = mongoose.model('Categories', categoriesSchema);