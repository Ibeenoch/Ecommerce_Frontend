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
    path: "/product/create/:id",
    element: <ProductFormPage/>,
  },
  {
    path: "/products",
    element: <Products isOpen={false} togglePopup={function (): void {
      throw new Error("Function not implemented.");
    } }/>,
  },
  {
    path: "/checkout",
    element: <CheckOutPage/>,
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