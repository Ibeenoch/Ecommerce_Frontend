import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";
import ProductReviewForm from "../features/ProductList/components/ProductReviewForm";

const ProductReviewFormPage = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar isOpen={isOpen}>
        <ProductReviewForm />
      </NavBar>
      <Footer />
    </>
  );
};

export default ProductReviewFormPage;
