const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// const authMiddleware = async (req, res, next) => {
//     // Get token from request headers
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(401).json({ message: 'Authorization token is required' });
//     }

//     try {
//         // Verify token with JWT secret
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Check if token is expired
//         if (decoded.exp < Date.now() / 1000) {
//             return res.status(401).json({ message: 'Token expired' });
//         }

//         // Fetch user details based on decoded userId
//         req.user = await User.findById(decoded.userId);
//         next();
//     } catch (error) {
//         console.log(error);
//         // Handle invalid token or other verification errors
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };
const authMiddleware = async (req, res, next) => {
    try {
      // test token
      const token = req.headers["authorization"];
      console.log(token)
      // if the token is undefined =>
      if (!token) {
        return res.status(400).send({ errors: [{ msg: "Unauthorized1" }] });
      }
      // get the id from the token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  
      // search the user
      const user = await User.findById(decoded.userId).select("-password");
  
      // send not authorisation IF NOT USER
      if (!user) {
        return res.status(400).send({ errors: [{ msg: "Unauthorized2" }] });
      }
  
      // if user exist
      req.user = user;
  
      next();
    } catch (error) {
        console.log(error)
      return res.status(500).send({ errors: [{ msg: "Unauthorized123" }] });
      
    }
  };

module.exports = authMiddleware;




