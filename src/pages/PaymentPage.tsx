import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Payment from "../features/payment/Payment";
import Footer from "./Footer";

const PaymentPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <NavBar isOpen={isOpen}>
        <Payment />
      </NavBar>
      <Footer />
    </>
  );
};

export default PaymentPage;
