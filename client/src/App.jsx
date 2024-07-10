import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Abouut from "./pages/Abouut";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Error from "./pages/Error";




const App = () => {
  return (
   <>

    <BrowserRouter>
      <NavBar/>
       <Routes>
         <Route path="/" element ={<Home/>} />
         <Route path="/about" element = {<Abouut/>} />
         <Route path="/contact" element ={<Contact/>} />
         <Route path="/service" element ={<Service/>} />
         <Route path="/register" element ={<Register/>} />
         <Route path="/login" element ={<Login/>} />
         <Route path="/logout" element ={<Logout/>} />
         <Route path="*" element= {<Error/>} />
       </Routes>
    </BrowserRouter>
   </>
  );
};

export default App