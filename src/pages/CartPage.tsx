import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Cart from "../features/cart/Cart";
import Footer from "./Footer";

const CartPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <NavBar isOpen={isOpen}>
        <Cart />
      </NavBar>
      <Footer />
    </>
  );
};

export default CartPage;
