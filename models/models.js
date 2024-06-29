const mongoose=require('mongoose')
const db=require('../config/db')
const { Schema }=mongoose
const usershema = require('../models/numbermodel')

const userschema =new Schema({
   
userId:{
      type:Schema.Types.ObjectId,
      ref:usershema.modelName,
  },
email :{
   type:String,
   required:false,
   unique:true,
 
},
idofcard :{
   type:String,
   required:false,
   unique:true,
 
},
fullname :{
   type:String,
   required:false,
  
},
willaya:{
   type:String,
   required:false,
},
day:{
   type:Number,
   required:false,
},
month:{
   type:Number,
   required:false,
},
year:{
   type:Number,
   required:false,
},

createdat: {
   type: Date,
   default: Date.now // Use default value of current date/time
}
})

const Patients=db.model('usersign',userschema)
module.exports=Patients