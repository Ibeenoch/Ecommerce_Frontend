import React, { useState } from 'react'
import NavBar from './NavBar/NavBar'
import Loading from '../Loading';

const LoadingPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

  
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
    
  return (
    <>
    <NavBar isOpen={isOpen}>
        <Loading />
    </NavBar>
    </>
  )
}

export default LoadingPage
