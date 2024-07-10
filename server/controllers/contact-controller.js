const Contact = require("../models/contact-model");

const contactForm = async (req,res) =>{
   try {
      const response  = req.body;
      console.log("Received data: ", response);
      await Contact.create(response);
      res.status(200).json({message: "Message Sent succesfully"});
   } catch (error) {
    res.status(500).json({ message: "Message not delivered", error: error.message });
   }
};

module.exports = contactForm;