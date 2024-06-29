const mongoose=require('mongoose')
const db=require('../config/db')
const { Schema }=mongoose
const userschema =new Schema({
   

phonenumber :{
   type:Number,
   required:false,
   unique:true,
 
},
createdat: {
   type: Date,
   default: Date.now // Use default value of current date/time
}
})

const Numbers=db.model('number',userschema)
module.exports=Numbers