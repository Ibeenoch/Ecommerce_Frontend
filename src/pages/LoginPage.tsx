import { useState } from 'react';
import Login from '../features/auth/Login'
import NavBar from './NavBar/NavBar';

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
    <NavBar isOpen={isOpen} >
      <Login />
    </NavBar>
    </>
    
  )
}

export default LoginPage
