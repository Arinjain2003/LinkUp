import React from 'react'

import { useState } from 'react';
import { useAuth } from '../store/auth';

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

const Contact = () => {

  const[contact,setContact] =  useState({
    defaultContactFormData
  });

  const [userData,setUserData] = useState(true);

  const{ user } = useAuth();

  if(userData && user){
     setContact({
      username : user.username,
      email : user.email,
      message : "",
     })
    
     setUserData(false);
  }

  const handleInput =(e) =>{
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...user,
      [name]:value
    })
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
  
    
    try {
      console.log("Contact data: ", contact);
      const response = await fetch("http://localhost:5000/api/form/contact",{
        method : "POST",
        headers: { 
          'Content-Type': "application/json",
        },
        body: JSON.stringify(contact),
      });
      console.log("response: ", response);


      if (response.ok) {
        setContact(defaultContactFormData);
        const responseData = await response.json();
        alert('Messge sent');
        console.log(responseData);
      } else {
        // Handle API error here
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error in contact page", error);
    }

  }
  
  return (
    <>
        <section>
          <main>
            <div className="section-registration">
              <div className="container grid grid-two-cols">
              
                <div className="registration-image">
                    <img src = "/images/support.png" alt="lets fill the login form" width="500" height="500"/>
                </div>
                 
                <div className="registration-form">
                <h1 className="main-heading mb-3">Contact us</h1>
                <br />
                <form   onSubmit={handleSubmit}>
                 <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={contact.username}
                      onChange={handleInput}
                      placeholder="Enter your username"
                    />
                  </div>
                  
                  
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={contact.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                  <label htmlFor="message">Message</label>
                    <input
                      type="text"
                      name="message"
                      value={contact.message}
                      onChange={handleInput}
                      placeholder="Enter your message"
                    />
                  </div>

                
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Submit
                  </button>
                </form>
              </div>

              </div>
            </div>
          </main>

          <section className="mb-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.535869964506!2d76.84871217509345!3d23.077471479135312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397ce9ceaaaaaaab%3A0xa224b6b82b421f83!2sVIT%20Bhopal%20University!5e0!3m2!1sen!2sin!4v1718360967962!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">

            </iframe>
        </section>
        </section>
      </>
  )
}

export default Contact