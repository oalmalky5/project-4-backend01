const mongoose = require('mongoose')


// for version 
const userSchema = new mongoose.Schema({
  // this is where the user will login
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  hashedPassword: {
    type: String, 
    required: true
  },

  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  products:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}],
  // cart:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Cart",
  // },



  // should have a regular client and an admin
  token: String
  
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

userSchema.virtual('examples', {
  ref: 'Example',
  localField: '_id',
  foreignField: 'owner'
});

module.exports = mongoose.model('User', userSchema)
