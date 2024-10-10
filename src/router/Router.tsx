import { Routes, Route } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";
import FinancePage from "../pages/FinancePage/FinancePage";
import ClassPage from "../pages/ClassPage/ClassPage";
import ClassSlugPage from "../pages/ClassPage/ClassSlugPage/ClassSlugPage";
import AccountsPage from "../pages/SettingsPage/AccountsPage";
import ProfilPage from "../pages/ProfilPage/ProfilPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/class" element={<ClassPage />} />
          <Route path="/class/:slug" element={<ClassSlugPage />} />
          <Route path="/settings/accounts" element={<AccountsPage />} />
          <Route path="/profil" element={<ProfilPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default Router;
