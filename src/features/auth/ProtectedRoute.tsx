import React, { ReactElement, ReactNode, useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from './authSlice'
import LoginPage from '../../pages/LoginPage'
import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { jwtDecode } from 'jwt-decode'
interface Children {
    child: ReactElement | any
}
const ProtectedRoute: React.FC<Children> = ({ child }) => {
    const user = JSON.parse(localStorage.getItem('user') as any)
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const gettoken = user && user.token;
    const token = gettoken ? JSON.stringify(gettoken) : '10';

    useEffect(() => {
        
   const isTokenExpired = (token: any) => {
    if(!token){
      addToast('Session expiry please login to continue',
        {
          appearance: 'info',
          autoDismiss: true,
        }
      )
      localStorage.removeItem('user');
      navigate('/login');
    }else{
         const decodeToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now()/1000);
    const expiryTime = decodeToken?.exp;
    if(expiryTime){
        console.log(currentTime > expiryTime);
          if(currentTime > expiryTime){
           addToast('Session expiry please login to continue',
           {
             appearance: 'info',
             autoDismiss: true,
           }
         ) 
   
           localStorage.removeItem('user');
           navigate('/login')
          }else{
           return;
          }
       }
    }
      
  };

if(token !== null || token !== undefined){
    isTokenExpired(token)
}
  
}, [token])

    if(user && user.id){
        return (
            child
        )
    }else{
        return (
            <LoginPage />
        )
    }
}

export default ProtectedRoute
