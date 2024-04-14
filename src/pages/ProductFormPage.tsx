import React, { useState } from 'react'
import NavBar from './NavBar/NavBar'
import ProductForm from '../features/ProductList/components/ProductForm'
import Footer from './Footer';

const ProductFormPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
    <NavBar isOpen={isOpen}>
    <ProductForm />
    </NavBar>
    <Footer />
    </>
  )
}

export default ProductFormPage
