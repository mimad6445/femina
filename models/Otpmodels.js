const mongoose=require('mongoose')
const db=require('../config/db')
const { Schema }=mongoose
const usershema = require('../models/numbermodel')

const userschema =new Schema({
   
    userId:{
        type:Schema.Types.ObjectId,
        ref:usershema.modelName,
    },
Otp :{
   type:String,
   required:false,
   unique:true,
 
},
createdat: {
   type: Date,
   default: Date.now // Use default value of current date/time
}
})

const Numbers=db.model('Otp',userschema)
module.exports=Numbers