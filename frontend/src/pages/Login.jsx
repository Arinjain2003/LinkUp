
import React, { useState, useContext } from "react";
import api from "../Services/api";
import { Button, Form, FormGroup, Alert, Toast } from "reactstrap";
import { UserContext } from '../user-context';
import { useNavigate } from 'react-router-dom';
import SignIn from '../assets/LoginRegister/images/signin-image.jpg'
import { MdLock, MdEmail } from "react-icons/md";
import {  toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event,emailParam, passwordParam) => {
    if (event) event.preventDefault();

    const response = await api.post("/login", {  email: emailParam, password: passwordParam });
    const user_id = response.data.user_id || false;
    const user = response.data.user || false;

    try {
      if (user && user_id) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);

        setIsLoggedIn(true);
        navigate('/');
        alert("Login sucessful")

      } else {
        const { message } = response.data;
        setError(true);
       // setErrorMessage(message);
        toast(message);
        // setTimeout(() => {
        //   setError(false);
        //   setErrorMessage("");
        // }, 2000);
      }
    } catch (err) {
      setError(true);
      setErrorMessage("Error is " + err);
    }
  };
  const handleDummyLogin = () => {
    const dummyEmail = "guest.dummy@gmail.com";
    const dummyPassword = "qwert";
    setEmail(dummyEmail);
    setPassword(dummyPassword);
    handleSubmit(null, dummyEmail, dummyPassword);
  };

  return (

    <div className="main min-h-screen" style={{ backgroundImage: `url(/bkgnd.png)`, backgroundRepeat: "no-repeat", backgroundPosition: 'center',backgroundSize:'cover' }}>
      <section className="sign-in">
        <div className="mb-4">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure><img src={SignIn} alt="sing up image" /></figure>
              <a className="signup-image-link underline"
                style={{ cursor: "pointer",color:'blue' }}
                onClick={() => {
                  navigate("/register");
                }}>Create an account</a>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Log In</h2>
              <Form onSubmit={handleSubmit}>
                <div className="form-group flex" style={{ justifyContent: "center" }}>
                  <label for="your_name"><MdEmail fontSize="large" /></label>
                    <input
                      className="ml-4 bg-white"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Enter your email here"
                  />
                </div>
                <div className="form-group flex" style={{ justifyContent: "center" }}>
                  <label for="your_pass"><MdLock fontSize="large" /></label>
                    <input
                      className="ml-4"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Enter your password here"
                  />
                </div>
                <div className="flex space-x-4">
                    <FormGroup>
                      <Button type="submit" color="success" className="bg-green-500 text-white py-2 px-4 rounded-md">Submit</Button>
                    </FormGroup>
                    <Button type="button" onClick={handleDummyLogin} className="bg-blue-500 text-white py-2 px-4 rounded-md"> Guest</Button>
                </div>
              </Form>
              
              
              {errorMessage ? (
                <Alert color="danger" className="event-validation">
                  {errorMessage}
                </Alert>
              ) : (
                ""
              )}
            </div>
          </div>
          </div>
          </div>
      </section>

    </div>
  );
}

export default Login;