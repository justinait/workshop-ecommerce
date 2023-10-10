import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedAdmin() {
  const { user} = useContext(AuthContext);
  const rolAdmin = import.meta.env.VITE_ROLADMIN
  return (
    <>
      {
        user?.rol === rolAdmin ?
        <Outlet /> :
        <Navigate to="/"/>
      
      }
    </>
  )
}

export default ProtectedAdmin