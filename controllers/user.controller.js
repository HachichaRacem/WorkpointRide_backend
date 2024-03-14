const UserModel = require('../models/user.model');
const UserServices= require('../services/user.services');

const UserController = {
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const successRes = await UserServices.registerUser(email, password);
      res.json({ status: true, success: "User registered successfully" });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UserServices.checkuser(email);
      console.log(" il user houa ",user);

      if(!user){
        throw new Error ('User dont exist');
      }

      const isMatch = await user.comparePassword(password);

      if(isMatch===false){
        throw new Error ('Invalid password');
      }
      let tokenData={_id:user._id,email:user.email};
      const token =await UserServices.generateToken(tokenData,"secretKey",'1h')
      res.status(200).json({status:true,token:token})
      
    } catch (error) {
      throw error // Pass the error to the error handling middleware
    }
  }
};

module.exports = UserController;
