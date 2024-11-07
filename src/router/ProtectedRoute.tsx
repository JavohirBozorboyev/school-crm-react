import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();

  useEffect(() => {
    // Token mavjudligini doimiy tekshirib turadi
    if (!isAuthenticated) {
      navigate("/login"); // Token bo'lmasa, login sahifasiga yo'naltiradi
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
