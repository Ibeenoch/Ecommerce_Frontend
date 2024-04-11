import React, { useState } from 'react'
import NavBar from './NavBar/NavBar';
import Payment from '../features/payment/Payment';

const PaymentPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <>
       <NavBar isOpen={isOpen} >
        <Payment/>
       </NavBar>
      </>
      
    )
}

export default PaymentPage
