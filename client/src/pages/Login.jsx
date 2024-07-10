import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../store/auth';

import { toast } from 'react-toastify';


const Login = () => {
  const[user,setUser] =  useState({
    email:"",
    password:""
  });

 const navigate = useNavigate();
 const {storeTokenInLS} = useAuth();

  const handleInput =(e) =>{
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]:value
    })
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("Login form : ", response);

      if (response.ok) {
        const responseData = await response.json();
        //localStorage.setItem("token",responseData.token);
        storeTokenInLS(responseData.token);
        navigate("/")
        toast.success("Login successful");
        setUser({ email: "", password: "" });
        console.log(responseData);
      } else {
        toast.error("Invalid cridential");
        console.log("Invalid cridential", "error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }
  
  
  return (
    <>
        <section>
          <main>
            <div className="section-registration">
              <div className="container grid grid-two-cols">
              
                <div className="registration-image">
                    <img src = "/images/login.png" alt="lets fill the login form" width="500" height="500"/>
                </div>
                 
                <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit} >
                 <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>

              </div>
            </div>
          </main>
        </section>
      </>
  )
}

export default Login