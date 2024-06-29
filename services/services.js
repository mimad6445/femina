const dbqa=require('../models/models')
const dbqphone=require('../models/numbermodel')

    const jwt =require('jsonwebtoken')
    const twilio = require('twilio');

    const accountSid = 'AC23bcd773aa34ddaf19ad84bc8e32ff67';
    const authToken = '0b5e01c98ea9a84812e45916dde20e58';
    const client = new twilio(accountSid, authToken);

    class serviceuser{
      static async registeruser(email,fullname,willaya,day,month,year,idofcard,userId){
        try{
          const par=new dbqa({email,fullname,willaya,day,month,year,idofcard,userId})
          return await par.save()
  
        }catch(err){console.log(err)}
      }
      static async generatetoken(tokendata,secretkey,jwt_expire){
        return jwt.sign(tokendata,secretkey,{expiresIn:jwt_expire})
 
      }
      static async getdata(userId){
        try{
        const goti=await dbqa.find({userId})
        return goti
  
        }catch(err){console.log(err)}
      }
      static async registerbyphone(phonenumber){
        try{
          const par=new dbqphone({phonenumber})
          return await par.save()
  
        }catch(err){console.log(err)}
      }

      
static async sendOtp(toPhoneNumber, otp) {
  return client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: '+14796684047', 
    to: toPhoneNumber
  });
}
       }




module.exports = serviceuser ;

