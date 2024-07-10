const {Schema , model ,default :mongoose} = require("mongoose");

const contactSchema = new Schema({
   username : {type:String,require:true},
   email : {type:String,require:true},
   message : {type:String}
});

// definig the model or the collection name
const  Contact = new model("Contact",contactSchema);
module.exports = Contact;

