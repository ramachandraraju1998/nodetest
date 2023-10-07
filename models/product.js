const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken'); 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
}, {
    versionKey: false
})

/* 
productSchema.statics.findProduct = async (product) => {
    const product = await Product.findOne({
        product
    })
    if (!product) {
        throw new Error('Product Doesnot Exist!')
    }
    return product
}


productSchema.statics.getProducts = async () => {
    const product = await Product.find({})
    const products = product.map((product)=>{
        return {product:product.email,quantity:product.quantity}
    });
    if (!product) {
        throw new Error('Products doesnt exists!')
    }
    return products
}

 */
const Products = mongoose.model('Products', productSchema)
module.exports = Products