import React, { useState } from 'react'
import SignUp from '../features/auth/SignUp'
import NavBar from './NavBar/NavBar';
import Footer from './Footer';

const RegisterPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <NavBar isOpen={isOpen} >
        <SignUp />
        </NavBar>
        <Footer />
    </>
  )
}

export default RegisterPage
