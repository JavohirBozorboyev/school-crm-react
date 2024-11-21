import { useSelector } from "react-redux";
import { RootState } from "../store";

const AccessControl = ({
  requiredPermissions = [],
  requiredPrivileges = [],
  children,
}: {
  children: React.ReactNode;
  requiredPermissions: string[];
  requiredPrivileges: string[];
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const hasPermission = requiredPermissions.every((perm) =>
    user?.permissions?.includes(perm)
  );
  const hasPrivilege = requiredPrivileges.every((priv) =>
    user?.privileges?.includes(priv)
  );

  if (hasPermission && hasPrivilege) {
    return <>{children}</>;
  }

  return null; // Ruhsat bo'lmasa, hech narsa qaytarmaydi
};

export default AccessControl;
