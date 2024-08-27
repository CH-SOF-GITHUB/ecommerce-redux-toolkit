import React from 'react'
import Menu from './Menu'
import { Navigate, Outlet } from 'react-router-dom'

/**
 * The `ProtectedRoute` component checks for a token in localStorage and renders either a `Menu` and
 * `Outlet` or navigates to the login page based on the token's presence.
 */
const ProtectedRoute = () => {
  // get token from localStorage
  let token = localStorage.getItem('token')
  return token !== null ? (
    <>
      <Menu />
      <Outlet />
    </>
  ) : (
    <Navigate to='login' />
  )
}

export default ProtectedRoute
