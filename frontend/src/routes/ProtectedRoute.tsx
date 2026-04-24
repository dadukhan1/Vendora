/** @format */


import { useAppSelector } from "../Redux Toolkit/store.ts";
import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
  requiredRole: "ROLE_ADMIN" | "ROLE_SELLER" | "ROLE_CUSTOMER";
};

const ProtectedRoute = ({ children, requiredRole }: Props) => {
  const { user } = useAppSelector((store) => store.user);
  const { seller } = useAppSelector((store) => store.seller);

  const role = user?.role || (seller ? "ROLE_SELLER" : null);

  if (!role) {
    return <Navigate to='/' replace />;
  }

  if (role !== requiredRole) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
