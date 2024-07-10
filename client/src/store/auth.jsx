import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
 
    const[token,setToken] = useState(localStorage.getItem('token')); 
    const[user,setUser] = useState("");
    const[services,setServices] = useState([]);

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token',serverToken);
    };

    let isLoggedIn = !!token;
    console.log('is Logged in :',isLoggedIn)
 
    // tackling thr logout functionalityy
    
    const LogoutUser =() =>{
      setToken("");
      return localStorage.removeItem("token");
    }

    // JWT AUTHENTICATION  - TO GET THE USER DATA
  
    const userAuthentication = async() =>{
        try{
           const response = await fetch("http://localhost:5000/api/auth/user",{
            method:"GET",
            headers:{
                Authorization : `Bearer ${token}`,
            }
         })
         if(response.ok){
            const data = await response.json(); 
            console.log("user data " , data.userData);
            setUser(data.userData); 
         }
        }catch(error){
            console.log("error fetching data");
        }
    }

    // to fetch the Service data from the DataBase
    const getServices = async() => {
         try{
            const response = await fetch("http://localhost:5000/api/data/service",{
                method : "GET",
            })
            if(response.ok){
                const data = await response.json(); 
                //   console.log(data.msg); 
                  setServices(data.msg);
             }
         }catch(error){
            console.log(`error fetching service data : ${error}`);
         }

    }

    useEffect(() =>{
          getServices();
          userAuthentication();
    },[]); 
   

   return(
   <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user,services}}>
    {children}
   </AuthContext.Provider>
   );
}

export const useAuth =() =>{
    return useContext(AuthContext)
}