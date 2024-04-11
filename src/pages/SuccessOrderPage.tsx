import React, { useState } from 'react'
import NavBar from './NavBar/NavBar';
import OrderSuccessPage from '../features/checkout/OrderSuccessPage';

const SuccessOrderPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <>
       <NavBar isOpen={isOpen} >
        <OrderSuccessPage/>
       </NavBar>
      </>
      
    )
}

export default SuccessOrderPage
