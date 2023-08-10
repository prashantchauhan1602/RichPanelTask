import React, { useContext } from 'react'
import { AppContext } from './AppContext'
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  
  const {user} = useContext(AppContext)

  let location = useLocation();
  
  if(user)
  {
    return children;
  }

  return <Navigate to="/" state={{from: location}} replace />
}
