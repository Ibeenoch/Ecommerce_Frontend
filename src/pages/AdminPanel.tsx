import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Admin from "../features/auth/Admin";

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <NavBar isOpen={isOpen}>
        <Admin />
      </NavBar>
    </>
  );
};

export default AdminPanel;
