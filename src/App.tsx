import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { ToastProvider } from 'react-toast-notifications'
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckOutPage from "./pages/CheckOutPage";
import ProductFormPage from "./pages/ProductFormPage";
import Products from "./features/ProductList/components/Products";
import RegisterPage from "./pages/RegisterPage";
import Verification from "./features/auth/Verification";
import PasswordRecovery from "./features/auth/PasswordRecovery";
import ChangePassword from "./features/auth/ChangePassword";
import ProfilePage from "./pages/ProfilePage";
import PaymentPage from "./pages/PaymentPage";
import SuccessOrderPage from "./pages/SuccessOrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/verify/email",
    element: <Verification/>,
  },
  {
    path: "/verify/email/:id",
    element: <Verification/>,
  },
  {
    path: "/password/link",
    element: <PasswordRecovery/>,
  },
  {
    path: "/password/change/:email",
    element: <ChangePassword/>,
  },
  {
    path: "/cart",
    element: <CartPage/>,
  },
  {
    path: "/product/details/:id",
    element: <ProductDetailPage/>,
  },
  {
    path: "/product/create",
    element: <ProductFormPage/>,
  },
  {
    path: "/product/update/:id",
    element: <ProductFormPage/>,
  },
  {
    path: "/products",
    element: <Products isOpen={false} togglePopup={function (): void {
      throw new Error("Function not implemented.");
    } }/>,
  },
  {
    path: "/checkout/:id",
    element: <CheckOutPage/>,
  },
  {
    path: "/payment/:id",
    element: <PaymentPage/>,
  },
  {
    path: "/order/success",
    element: <SuccessOrderPage/>,
  },
  {
    path: "/payment",
    element: <PaymentPage/>,
  },
  {
    path: "/profile/:id",
    element: <ProfilePage/>,
  },
  
]);


function App() {
  
  return (
    <ToastProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ToastProvider>
  );
}

export default App;
