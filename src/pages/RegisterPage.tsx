import React, { useState } from 'react'
import SignUp from '../features/auth/SignUp'
import NavBar from './NavBar/NavBar';

const RegisterPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <NavBar isOpen={isOpen} >
        <SignUp />
        </NavBar>
    </>
  )
}

export default RegisterPage
