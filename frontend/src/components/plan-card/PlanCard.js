import React ,{useContext} from 'react'
import './plancard.css'
import {AppContext} from "../../utils/AppContext"
import { useNavigate } from 'react-router-dom';

export default function PlanCard({type,plan,period,amount,subId}) {

  const {cancelSubscription} = useContext(AppContext);
  const navigator = useNavigate();

  let date = new Date().toLocaleDateString();
  // console.log(date);

  return (
    <div className='card plan__card' >
        <div className="card__header">
            <div className='header__left'>
                 <h3>Current Plan Details</h3>
                 {
                    type==="active" ? <span className='active__badge'>Active</span>
                     : <span className='cancel__badge'>Cancelled</span>
                 }
                
            </div>
           
           {
            type==="active" ? <button onClick={() => {
              cancelSubscription(subId)
            } }> Cancel</button> : null
           }
            
        </div>

        <p className='namePlan'>{plan}</p>
        {
          plan === "mobile" ? <p className='device-select'>Phone+Tablet</p> : <p>Phone+Tablet+Computer+TV</p>
        }
   
        <h1>&#8377; {amount}/<sub style={{fontWeight: 'normal'}}>{period}</sub></h1>
        
        <button className='btn btn__secondary' id='pbtn' onClick={() =>{
          navigator("/plans");
        }} >
         
            {type==="active" ? "Change Plan" : "Choose Plan" }</button>

          {
            type === "active" ? 
            (<p>Your subscription has started from now and will auto renew itself.</p>)
            :
            <p>Your subscription was cancelled and you will lose access to services on {date}</p>
          }

    </div>
  )
}
