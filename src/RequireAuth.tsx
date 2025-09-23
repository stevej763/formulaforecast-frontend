// No need to import React
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const isAuthenticated = useSelector((state: RootState) => state.user.authenticated);
  console.log(isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}
