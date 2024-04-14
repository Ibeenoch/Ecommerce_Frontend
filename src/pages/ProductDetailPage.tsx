import React, { useState } from 'react'
import NavBar from './NavBar/NavBar'
import ProductDetail from '../features/ProductList/components/ProductDetail'
import Footer from './Footer';

const ProductDetailPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
    <NavBar isOpen={isOpen}>
    <ProductDetail />
    </NavBar>
    <Footer />
    </>
  )
}

export default ProductDetailPage
