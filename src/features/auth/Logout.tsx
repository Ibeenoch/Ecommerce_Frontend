import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from './authSlice';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('alluser');
        dispatch(logout())
        navigate('/login');
    })
  return (
    <div>
      You are being Signed out now...
    </div>
  )
}

export default Logout
