
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Plans from './components/plans/Plans';
import Dashboard from './components/dashboard/Dashboard';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {  toast } from 'react-toastify';

import { AppContext } from './utils/AppContext';
import { useState } from 'react';
import ProtectedRoute from "./utils/ProtectedRoute"
import StripeContainer from './components/stripe/StripeContainer';


function App() {

  const navigator = useNavigate();

  // user details states
  const [user,setUser] = useState(null)
  const [transactions,setTransactions] = useState([])

  const baseUrl = "https://richpanel-backend-2up9.onrender.com"

  // indicator states
  const [loading,setLoading] = useState(false)

  // function to login user
  const login = (email,password) => {
    setLoading(true)
    fetch(baseUrl+"/auth/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,password})
    })
    .then(response => response.json())
    .then(response => {
      setLoading(false)
      if(response.success)
      {
        showAlert("Welcome "+response.name,false);
        setUser(response)
        navigator("/plans",{replace: true})
      }
      else
        showAlert(response.message,true)
      
      
    })
    .catch((err) => setLoading(false))
  }

  // function signup user
  const signup = (name,email,password) => {
    setLoading(true)
    fetch(baseUrl+"/auth/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,password,name})
    })
    .then(response => response.json())
    .then(response => {
      setLoading(false)
      if(response.success)
      {
        showAlert("Account Created Successfully ",false);
        navigator("/",{replace: true})
      }
      else
        showAlert(response.message,true)
     
    })
    .catch((err) => setLoading(false))
  }
  
  // function to logout user
  const logout = () => {
    setUser(null)
    navigator("/",{replace: true})
  }

  // function that will show the alert using toastify react library
  const showAlert = (message,error) => {
    if(error)
    {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    else
    {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }

  // function to add subscription details in the database. It will be called by PaymentCard Component once the subscription has been verified successfully
  const addSubscriptionDetialsToDatabase = (planDetails,stripePaymentId,subscriptionId) => {
    fetch(baseUrl+"/plans/add-subscription",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
      body: JSON.stringify({planDetails,stripePaymentId,subscriptionId})
    })
    .then(() => {
      // once transaction added navigate to dashboard
      showAlert("Subscription Started !",false)
      navigator("/dashboard",{replace: true})
    })
    .catch(err => showAlert(err.message,true) )
  }

  // method to cancel subscription
  const cancelSubscription = (subscriptionId) => {

    fetch(baseUrl+"/plans/cancel/"+subscriptionId,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      }
    })
    .then(res => res.json())
    .then((data) => {
      // once transaction added navigate to dashboard
      if(data.success){
        fetchAllSubscriptions() // refresh subscriptions
        showAlert("Subscription Cancelled !",false)
      }
      else
      {
        showAlert(data.message)
      }
    

    })
    .catch(err => showAlert(err.message,true) )
  }

  // method to fetch all the transactions
  const fetchAllSubscriptions = () => {
    fetch(baseUrl+"/plans/subscriptions",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.success)
      {

        setTransactions(data.subscriptions)
      }
      else
      {
   
        showAlert(data.message,true)
      }
    })
    .catch(() => {
      showAlert("Failed to fetch transactions ",true)
    })
  }

  return (
    <AppContext.Provider value={{login,signup,logout,loading,user,showAlert,addSubscriptionDetialsToDatabase,baseUrl,cancelSubscription,fetchAllSubscriptions,transactions}}>

        <ToastContainer />
        <div className="App">
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={ <Signup /> } />
              <Route path='/plans' element={ <ProtectedRoute><Plans /></ProtectedRoute>} />
              <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
              <Route path='/payment' element={<StripeContainer />} />
            </Routes>
        </div>

    </AppContext.Provider>
  );
}

export default App;
