/** @format */

// src/components/ProtectedRoute.tsx
import { useAppSelector } from "../Redux Toolkit/store.ts";
import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
  requiredRole: "ROLE_ADMIN" | "ROLE_SELLER" | "ROLE_CUSTOMER";
};

const ProtectedRoute = ({ children, requiredRole }: Props) => {
  const { user } = useAppSelector((store) => store.user);

  const { role } = useAppSelector((store) => store.auth);

  if (!role) return <Navigate to='/login' replace />;
  
  if (role !== requiredRole) return <Navigate to='/unauthorized' replace />;

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (user.role !== requiredRole) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
