import React, { ReactElement, ReactNode } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "./authSlice";
import LoginPage from "../../pages/LoginPage";
interface Children {
  child: ReactElement | any;
}
const AdminProtectedRoute: React.FC<Children> = ({ child }) => {
  const { user } = useAppSelector(selectUser);
  if (user && user.role && user.role === "ADMIN") {
    return child;
  } else {
    return <LoginPage />;
  }
};

export default AdminProtectedRoute;
