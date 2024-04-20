import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import CheckOut from "../features/checkout/CheckOut";
import Footer from "./Footer";

const CheckOutPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <NavBar isOpen={isOpen}>
        <CheckOut />
      </NavBar>
      <Footer />
    </>
  );
};

export default CheckOutPage;
