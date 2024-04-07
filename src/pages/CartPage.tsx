import React, { useState } from 'react'
import NavBar from './NavBar/NavBar'
import Cart from '../features/cart/Cart'

const CartPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
     <NavBar isOpen={isOpen} >
      <Cart/>
     </NavBar>
    </>
    
  )
}

export default CartPage
