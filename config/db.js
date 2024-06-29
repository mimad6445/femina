const mongoose=require('mongoose')
const connection = mongoose.createConnection('mongodb+srv://mouadchiali:mouadchiali@cluster0.4m2culi.mongodb.net/feminasign').on('open',()=>{
    console.log("connected")
}).on('error',()=>{
    console.log("not connected")
})
module.exports=connection