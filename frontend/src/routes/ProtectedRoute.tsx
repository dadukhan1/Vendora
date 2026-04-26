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
  const { profile: sellerProfile, error: sellerError } = useAppSelector((store) => store.seller);
  const { jwt, role: authRole } = useAppSelector((store) => store.auth);

  const role = user?.role || (sellerProfile ? "ROLE_SELLER" : null);

  // 1. If no JWT, redirect to home immediately
  if (!jwt) {
    return <Navigate to="/" replace />;
  }

  // 2. Immediate Role Mismatch Check (if role is in session)
  if (authRole && authRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Initialization/Loading state
  const isProfileLoading = authRole
    ? (authRole === "ROLE_SELLER" ? !sellerProfile : !user)
    : (!user && !sellerProfile);

  if (isProfileLoading) {
    if (userError || sellerError) {
      return <Navigate to="/" replace />;
    }

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 4. Final Authorization Check
  if (!role || role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
