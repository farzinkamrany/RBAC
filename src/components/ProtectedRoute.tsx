import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppStore } from "../app/store";

interface Props {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ allowedRoles, children }) => {
  const user = useAppStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
