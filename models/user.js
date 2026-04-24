const mongoose = require("mongoose");
const validator = require('validator');


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      validate:(value)=>{
       return validator.isEmail(value)
      
      }
    },
    password:{
      type:String,
      required:true,
      validate:(value)=>{
        return validator.isStrongPassword(value)
    }
  },
  gender:{
    type:String,
    default:"others"
  }
},
  { timestamps: true },
);

const USER = mongoose.model("USER", userSchema);

module.exports = USER;




