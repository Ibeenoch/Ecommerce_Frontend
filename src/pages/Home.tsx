import { useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";
import Products from "../features/ProductList/components/Products";
import { useAppDispatch } from "../app/hooks";
import { getAllproduct } from "../features/ProductList/ProductSlice";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const Home = () => {
  const { addToast } = useToasts();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar isOpen={isOpen}>
        <Products isOpen={isOpen} togglePopup={togglePopup} />
      </NavBar>
      <Footer />
    </>
  );
};

export default Home;
