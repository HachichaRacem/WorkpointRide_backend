const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    // _id:{
    //     type:Number,
    //     auto:true,
    //     required:true,
    // },
  firstName: {
    type: String,
    //required: true,
  },
  lastName: {
    type: String,
    //required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    //required: true,
  },

  password: {
    type: String,
    required: true,
  },
  // Other user fields...

  favoritePlaces: [{
    name: {
      type: String,
      //required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
       // required: true,
      },
      coordinates: {
        type: [Number],
       // required: true,
      },
    },
  }],

  recentItineraries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary',
  }],
});

// Hash password before saving to the database
// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (!user.isModified('password')) return next();
//     const hash = await bcrypt.hash(user.password, 10);
//     user.password = hash;
//     next();
//   });


userSchema.pre('save',async function(){
  try{
    var user =this;
    const salt = await(bcrypt.genSalt(10));
    const hashpass =await bcrypt.hash(user.password,salt);
  }catch(error){
    throw error;
  }
});

userSchema.methods.comparePassword = async function(userPassword){
  try{
const isMatch =await bcrypt.compare(userPassword,this.password);
  }catch(error){
    throw error;
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
