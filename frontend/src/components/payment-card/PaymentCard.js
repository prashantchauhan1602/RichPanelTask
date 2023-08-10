import React, {useContext} from 'react'
import './paymentcard.css'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import  { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {AppContext} from "../../utils/AppContext"


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "grey",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "grey" },
			"::placeholder": { color: "grey" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}

export default function PaymentCard() {


    const [address,setAddress] = useState("")
    const stripe = useStripe()
    const elements = useElements()
    const {user,showAlert,addSubscriptionDetialsToDatabase,baseUrl} = useContext(AppContext)
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)

    // taking params to this component by routes
    const {state} = useLocation();
  
    // method to start subscription
    const startSubscription = async (event) => {
        event.preventDefault();
        if(!stripe || !elements)
        {
            return;
        }
        setLoading(true)
        const result = await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement),
            billing_details: {
                email: user.email,
                name: user.name,
                address: address
            }
        });

        if(result.error)
        {
            showAlert(result.error.message,true);
            setLoading(false)
            return;
        }

        // make request to backend with generated payment method and other detials for starting subscription
        fetch(baseUrl+'/plans/subscribe',{
            method: "POST",
            body: JSON.stringify( 
                {'payment_method': result.paymentMethod.id, 
            'email': user.email,
            'planname':state.plan,
            'period':state.period
            }),
            headers : {
                "Content-Type": "application/json",
                "Authorization": user.token
            }
        })
        .then((rest) => rest.json())
        // if api call is success check if subscription needs verification
        .then(rest => {
            const {client_secret,status,subscriptionId} = rest;
            if(status == 'requires_action')
            {
                stripe.confirmCardPayment(client_secret)
                .then(result => {
                    // if error occurs while confirming payemnt
                    if(result.error)
                        showAlert("Payment Failed ! Please Try Again.",true)
                    else
                    {
                        // add this transaction in database
                        // state: will contain the billing period and plan prices itself
                        addSubscriptionDetialsToDatabase(state,result.paymentIntent.id,subscriptionId);
                        
                    }
                    setLoading(false)
                })
            }
            // if current transaction doesn't 
            else
            {
                // add this transaction in database
                addSubscriptionDetialsToDatabase(state)
                setLoading(false)
            }
        })
        // if something went wrong in api call 
        .catch((err) => {showAlert(err.message,true); setLoading(false)})
    
    }


    return (

        <div className='payment__card'>
        <div className="payment__info">
            <h2>Complete Payment</h2>
            <small>Enter your credit or debit card details below</small>
            <form  onSubmit={startSubscription}>
            
            <fieldset className="FormGroup">
                <div className="FormRow">
                <CardElement options={CARD_OPTIONS}/>
            
                </div>
            </fieldset>
            <input style={{
            iconColor: "grey",
            border: "1px solid #d5d5d5",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
            width:"95%",
            marginTop: 10,
            padding: 10,
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "grey" },
			"::placeholder": { color: "grey" }
            }} 
            onChange={e => setAddress(e.currentTarget.value)}
            required
            placeholder='Billing Address' />

            <input disabled={loading} value={loading ? "Transaction in Progress...." :"Confirm Payment"} className='btn' id='payment'  type="submit" />
             
            </form>
        </div>

        <div className="order__info">
            <h3>Order Summary</h3>
            <ul>
                <li>
                    Plan Name 
                    <span className='incapital'>
                        {state && state.plan}
                    </span>
                </li>
                <hr />
                <li>
                    Billing Cycle
                    <span className='incapital'>
                      {state && state.period}
                    </span>
                </li>
                <hr />
                <li>
                    Plan Price
                    <span>
                    &#8377;  {state && state.period  == "month" ? state.planInfo["Monthly-Price"] + "/mo" : state.planInfo["Yearly-Price"] + "/yr"}
                    </span>
                </li>
                <hr></hr>
            </ul>
        </div>
    </div> 

    
  
   
  )
}
