const userserv =require('../services/services')
const Jwt=require('jsonwebtoken')
const dbq=require('../models/models')
const dbqphone=require('../models/numbermodel')
const dbqotp=require('../models/Otpmodels')

exports.registerbyphone= async(req,res,next)=>{
  try{
const {phonenumber}=req.body
  const phonecontroller =await userserv.registerbyphone(phonenumber)
  const userlogin =await dbqphone.findOne({phonenumber})
  let tokendata ={id:userlogin._id,phonenumber:userlogin.phonenumber}
  var token =await userserv.generatetoken(tokendata,"phone","1h")
  res.json({status:true,success:"user succsefully",token:token})
  
}catch(err){console.log(err)}}
exports.getdatacontroller=async(req,res,next)=>{
  const {userId}=req.body
  let getdatafrom =await userserv.getdata(userId)
res.json({status:true,success:getdatafrom})

}

exports.registeruser= async(req,res,next)=>{
    try{
    const {email,fullname,willaya,day,month,year,idofcard,userId}=req.body
    const usercontrol =await userserv.registeruser(email,fullname,willaya,day,month,year,idofcard,userId)

    res.json({status:true,success:"user succsefully"})
    
}catch(err){console.log(err)}}

const otpTimers = {};
exports.getOtp = async (req, res) => {
  try {
    const latestOtp = await dbqotp.findOne().sort({ _id: -1 }).limit(1);

    if (!latestOtp) {
      return res.status(404).json({ message: 'No OTP found in the database' });
    }

    // Return the OTP value
    res.status(200).json({ otp: latestOtp.Otp });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching OTP from database', error: error.message });
  }
};
exports.sendOtp = async (req, res) => {
  const { phonenumber } = req.body;

  try {
    // Generate new OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Save OTP to the database
    let newOtp = new dbqotp({
      
      Otp: otp
    });
    await newOtp.save();

    // Send OTP using userserv.sendOtp()
    userserv.sendOtp(phonenumber, otp)
      .then(message => {
        res.status(200).json({ message: 'OTP sent successfully', sid: message.sid });
      })
      .catch(error => {
        res.status(500).json({ message: 'Error sending OTP', error: error.message });
      });

    // Set interval to update OTP every 3 minutes
    if (otpTimers[phonenumber]) {
      clearInterval(otpTimers[phonenumber]);
    }

    otpTimers[phonenumber] = setInterval(async () => {
      const newOtpValue = Math.floor(1000 + Math.random() * 9000);

      // Update OTP in the database
      await dbqotp.findOneAndUpdate({}, { Otp: newOtpValue });
    }, 3 * 60 * 1000); // 3 minutes interval

  } catch (error) {
    res.status(500).json({ message: 'Error saving OTP to database', error: error.message });
  }
};


















