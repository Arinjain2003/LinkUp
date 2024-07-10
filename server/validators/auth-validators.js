const {z} = require("zod");

// creating login schema 

// const loginSchema = z.object({
//     email: z
//     .string({required_error:"Email is required"})
//     .trim()
//     .email({message:"Invalid email"})
//     .min(3,{message: "email must be atleast of  3 character"})
//     .max(255,{message: "email must be atmost of 255 character"}),


// })

// creating an object schema

const signupSchema = z.object({
    username : z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message: "Name must be atleast of  3 character"})
    .max(255,{message: "Name must be atmost of 255 character"}),

    email: z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email"})
    .min(3,{message: "email must be atleast of  3 character"})
    .max(255,{message: "email must be atmost of 255 character"}),

    phone : z
    .string({required_error:"phone is required"})
    .trim()
    .min(10,{message: "phone must be atleast of  10 character"})
    .max(20,{message: "phone must be atmost of 20 character"}),

    password : z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message: "Name must be atleast of  3 character"})
    .max(255,{message: "Name must be atmost of 255 character"})
});

module.exports = signupSchema;