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
import TeachersPage from "../pages/TeachersPage/TeachersPage";
import TeacherSlugPage from "../pages/TeachersPage/TeacherSlugPage/TeacherSlugPage";
import StudentsPage from "../pages/StudentsPage/StudentsPage";
import StudentsSlugPage from "../pages/StudentsPage/StudentsSlugPage/StudentsSlugPage";
import PaymentPage from "../pages/FinancePage/PaymentPage/PaymentPage";

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
          <Route path="/finance/payment" element={<PaymentPage />} />
          <Route path="/class" element={<ClassPage />} />
          <Route path="/class/:slug" element={<ClassSlugPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/:slug" element={<StudentsSlugPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teachers/:slug" element={<TeacherSlugPage />} />
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
