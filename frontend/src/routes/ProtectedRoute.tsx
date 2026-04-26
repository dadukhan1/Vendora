/** @format */


import { useAppSelector } from "../Redux Toolkit/store.ts";
import { Navigate } from "react-router";

import { Box, CircularProgress } from "@mui/material";

type Props = {
  children: React.ReactNode;
  requiredRole: "ROLE_ADMIN" | "ROLE_SELLER" | "ROLE_CUSTOMER";
};

const ProtectedRoute = ({ children, requiredRole }: Props) => {
  const { user, error: userError } = useAppSelector((store) => store.user);
  const { seller, error: sellerError } = useAppSelector((store) => store.seller);
  const { jwt } = useAppSelector((store) => store.auth);

  const role = user?.role || (seller ? "ROLE_SELLER" : null);

  // 1. If no JWT, redirect to home immediately
  if (!jwt) {
    return <Navigate to="/" replace />;
  }

  // 2. If we have a JWT but no role yet, we are likely initializing or loading
  if (!role) {
    // If we hit an error during profile fetch, redirect to home
    if (userError || sellerError) {
      return <Navigate to="/" replace />;
    }
    // Otherwise show loading spinner
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 3. Role check
  if (role !== requiredRole) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
