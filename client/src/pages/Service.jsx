import React from 'react'
import { useAuth } from '../store/auth'
import './Service.css';

const Service = () => {
  const {services}  = useAuth();
  console.log(services);

 

  return (
     <section className="section-services" >
      <div className="container">
       <h1 className="main-heading">Services</h1>
       </div>
       <div className="container grid grid-three-cols">
         {services.map((currElem,index) => {
          const { price,description,provider,service } = currElem;

          return(
          <div className="card" key={index}>
          <div className="card-img">
            <img src="/images/design.png" alt="desginer" width="200"></img>
            <div className="grid grid-two-cols">
            <p> {provider}</p>
            <p>{price}</p>
           </div>
           <h2>{service}</h2>
           <p>{description}</p>
        </div>
        </div>
          )

        })}
       
     
       </div>
     </section>
  )
}

export default Service