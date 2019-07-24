const mongoose = require('mongoose')

// const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}, {
    timestamps: true
}
)

module.exports = mongoose.model('Product', ProductSchema)
