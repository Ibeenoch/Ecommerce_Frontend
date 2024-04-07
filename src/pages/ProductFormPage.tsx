import React, { useState } from 'react'
import NavBar from './NavBar/NavBar'
import ProductForm from '../features/ProductList/components/ProductForm'

const ProductFormPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
    <NavBar isOpen={isOpen}>
    <ProductForm />
    </NavBar>
    </>
  )
}

export default ProductFormPage
