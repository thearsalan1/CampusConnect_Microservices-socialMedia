import React from "react";
import { useAuthStore } from "../../features/auth/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const PublicOnlyRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  if (isInitializing) {
    return (
      <div className="bg-background flex items-center justify-center text-4xl text-primary font-logo">
        Loading....
      </div>
    );
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicOnlyRoutes;
