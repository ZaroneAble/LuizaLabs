const mongoose = require('mongoose')

const Cliente = mongoose.model('Cliente', {
   nome: {
      type:String,
      required: true,

   },
   email: {
      type:String,
      unique: true,
      required: true,
      lowercase: true,

   },
   approved:{
      type:Boolean,
   }, 

   createdAt: {
      type: Date,
      default: Date.now,
},

   listaFavoritos:{
      array:[{
         type:String,
         unique: true,
         
         
      }
      ]
},

})

module.exports = Cliente