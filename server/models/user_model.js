const mongoose =  require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
       username:{
        type: String,
        require : true,
       },
       email:{
        type: String,
        require : true,
       },
       phone:{
        type: String,
        require : true,
       },
       password:{
        type: String,
        require : true,
       },
       isAdmin:{
        type: Boolean,
        default : false
       }

});


// converting the passsword into  hash password
userSchema.pre("save",async function (next) {
     const user = this;
      
     if(!user.isModified('password')){
      return next();
     }
     
     try {
       const saltRounnd = await bcrypt.genSalt(10);
       const hash_password = await bcrypt.hash(user.password ,saltRounnd);
       user.password = hash_password;
     } catch (error) {
       next(error);
     }

})

// JWT  - jason web token 

userSchema.methods.generateToken = async function() {
     try {
       return jwt.sign({
              userId: this._id.toString(),
              email : this.email,
              isAdmin: this.isAdmin
       },
       process.env.JWT_SECRET_KEY,{
        expiresIn: "30d",
       }
      );

     } catch (error) {
       console.error(error);
     }
};

// comparing the enter password with hash password

// userSchema.methods.compare = async function(password){
//   return  bcrypt.compare(password,this.password);
// }

// definig the model or the collection name
const User = new mongoose.model("User",userSchema);
module.exports = User;