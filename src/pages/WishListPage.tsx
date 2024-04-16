import React, { useState } from 'react'
import NavBar from './NavBar/NavBar'
import Footer from './Footer';
import WishList from '../features/wishlist/WishList';

const WishListPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
     <NavBar isOpen={isOpen} >
      <WishList/>
     </NavBar>
     <Footer />
    </>
    
  )
}

export default WishListPage
