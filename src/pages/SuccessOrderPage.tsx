import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import OrderSuccessPage from "../features/checkout/OrderSuccessPage";
import Footer from "./Footer";

const SuccessOrderPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <NavBar isOpen={isOpen}>
        <OrderSuccessPage />
      </NavBar>
      <Footer />
    </>
  );
};

export default SuccessOrderPage;
