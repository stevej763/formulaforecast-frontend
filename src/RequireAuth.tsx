import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./features/auth/userSlice";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const user = useUser();
    const isAuthenticated = user?.authenticated ?? false;
    return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}
