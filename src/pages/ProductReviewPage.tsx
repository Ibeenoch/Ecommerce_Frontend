import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";
import ProductReview from "../features/ProductList/components/ProductReview";

const ProductReviewPage = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar isOpen={isOpen}>
        <ProductReview />
      </NavBar>
      <Footer />
    </>
  );
};

export default ProductReviewPage;
