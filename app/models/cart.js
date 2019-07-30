
const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
   products: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    

   }],

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}, {
    timestamps: true
}
)
module.exports = mongoose.model('Cart', CartSchema)




