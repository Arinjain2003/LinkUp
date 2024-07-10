const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const { use } = require("../router/auth-router");

// HOME PAGE
const home = async(req,res) =>{
     try{
        res.status(200).send('This is Home page'); 
     }catch(error){
        console.log(error);
     }
}


// REGISTRATION PAGE
const register = async (req, res) => {
   try {
     // const data = req.body;
     console.log(req.body);
     const { username, email, phone, password } = req.body;

     if (!username || !email || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

 
     const userExist = await User.findOne({ email: email });
 
     if (userExist) {
       return res.status(400).json({ message: "Email already exists" });
     }

 
     const userCreated = await User.create({ username, email, phone, password});
 
     res.status(201).json({
       msg: "Registration Successful",
       token: await userCreated.generateToken(),
       userId: userCreated._id.toString(),
     });
   } catch (error) {
     console.error("Error during registration:", error); // Improved logging
     res.status(500).json({ message: "Internal server error" });
   }
 };


// LOGIN PAGE

const login = async(req,res) =>{
  try {
   const{email , password } = req.body;

   const userExist = await User.findOne({email});
   console.log(userExist);

   if(!userExist){
      return res.status(400).json({message:"INVALID CRIDENTIALS"});
   }
   
   const user = await bcrypt.compare(password,userExist.password);

   // const user = await userExist.compare(password);

   if(user){
      res.status(200).json(
         {message:"Login succesfull",
         token : await userExist.generateToken(),
         userId : userExist._id.toString(),
      }); 
   }else{
      res.status(401).json({message: "invalid email or password"});
   }

   
  } catch (error) {
   res.status(500).json("internal server error");
  }

}

// USER LOGIC (TO SEND USER DATA)

const user = async (req,res) => {
   
   try{
       
      const userData = req.user;
      console.log(userData);

       return res.status(200).json({ userData});
   }catch(error){
      console.log(`error from the user route ${error}`)
   }

}


module.exports = {home,register,login,user};