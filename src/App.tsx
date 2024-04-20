import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { jwtDecode } from "jwt-decode";
import { ToastProvider } from "react-toast-notifications";
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
import ProtectedRoute from "./features/auth/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel";
import AdminProtectedRoute from "./features/auth/AdminProtectedRoute";
import VerifyMsgPage from "./pages/VerifyMsgPage";
import WishListPage from "./pages/WishListPage";
import ProductReviewPage from "./pages/ProductReviewPage";
import ProductReviewFormPage from "./pages/ProductReviewFormPage";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/auth/authSlice";
import Logout from "./features/auth/Logout";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verify/email",
    element: <VerifyMsgPage />,
  },
  {
    path: "/verify/email/:id",
    element: <VerifyMsgPage />,
  },
  {
    path: "/password/link",
    element: <PasswordRecovery />,
  },
  {
    path: "/password/change/:id",
    element: <ChangePassword />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/wishlist",
    element: <WishListPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/product/review/:id",
    element: <ProductReviewPage />,
  },
  {
    path: "/product/review/form/:id",
    element: (<ProtectedRoute child={<ProductReviewFormPage />} />),
  },
  {
    path: "/product/details/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/product/create",
    element: (<AdminProtectedRoute child={<ProductFormPage />}/>),
  },
  {
    path: "/product/update/:id",
    element: (<AdminProtectedRoute child={<ProductFormPage />}/>),
  },
  {
    path: "/products",
    element: (
      <Products
        isOpen={false}
        togglePopup={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  {
    path: "/checkout/:id",
    element: (<ProtectedRoute child={<CheckOutPage />}/>),
  },
  {
    path: "/payment/:id",
    element: (<ProtectedRoute child={<PaymentPage />}/>) ,
  },
  {
    path: "/order/success/:id",
    element: (<ProtectedRoute child={<SuccessOrderPage />}/>),
  },
  {
    path: "/payment",
    element: (<ProtectedRoute child={<PaymentPage />}/>),
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute child={<ProfilePage />} />
    ),
  },
  {
    path: "/admin/:id",
    element: (
      <AdminProtectedRoute child={<AdminPanel />} />
    ),
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
