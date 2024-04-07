import React, { useState } from 'react'
import NavBar from './NavBar/NavBar'
import ProductDetail from '../features/ProductList/components/ProductDetail'

const ProductDetailPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
    <NavBar isOpen={isOpen}>
    <ProductDetail />
    </NavBar>
    </>
  )
}

export default ProductDetailPage
