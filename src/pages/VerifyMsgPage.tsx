import React, { useState } from 'react'
import NavBar from './NavBar/NavBar';
import Footer from './Footer';
import Verification from '../features/auth/Verification';

const VerifyMsgPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <>
       <NavBar isOpen={isOpen} >
        <Verification/>
       </NavBar>
       <Footer />
      </>
      
    )
}

export default VerifyMsgPage
