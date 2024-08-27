import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../features/authSlice';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout()).then(() => navigate('/login'));
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default Logout
