const route=require('express').Router()
const dbcontrol=require('../controller/controller')
const dbq=require('../models/models')



route.post('/registeruser',dbcontrol.registerbyphone)
route.post('/sendotp', dbcontrol.sendOtp);
route.get('/fetchotp', dbcontrol.getOtp);

route.post('/registernow', dbcontrol.registeruser);
route.post('/getdata', dbcontrol.getdatacontroller);


module.exports=route