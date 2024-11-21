import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ProtectedPageProps {
  requiredPermissions?: string[];
  requiredPrivileges?: string[];
  fallbackPath?: string;
  children: React.ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({
  requiredPermissions = [],
  requiredPrivileges = [],
  fallbackPath = "/404",
  children,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const hasRequiredPermissions = requiredPermissions.every((perm) =>
    user?.permissions.includes(perm)
  );

  const hasRequiredPrivileges = requiredPrivileges.every((priv) =>
    user?.privileges.includes(priv)
  );

  if (!hasRequiredPermissions || !hasRequiredPrivileges) {
    return <Navigate to={fallbackPath} replace />;
  }
  return <>{children}</>;
};

export default ProtectedPage;
