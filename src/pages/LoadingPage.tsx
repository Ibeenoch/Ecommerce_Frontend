import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Loading from "../Loading";
import Footer from "./Footer";

const LoadingPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar isOpen={isOpen}>
        <Loading />
      </NavBar>
      <Footer />
    </>
  );
};

export default LoadingPage;
