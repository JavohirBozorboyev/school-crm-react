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
import AdminsPage from "../pages/SettingsPage/AdminsPage/AdminsPage";
import TeacherSlugPage from "../pages/TeachersPage/TeacherSlugPage/TeacherSlugPage";
import StudentsPage from "../pages/StudentsPage/StudentsPage";
import StudentsSlugPage from "../pages/StudentsPage/StudentsSlugPage/StudentsSlugPage";
import PaymentPage from "../pages/FinancePage/PaymentPage/PaymentPage";
import AddAdminPage from "../pages/SettingsPage/AdminsPage/AddAdminPage";
import ProtectedPage from "../security/ProtectedPage";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "axios";
import AddNewTeacherPage from "../pages/TeachersPage/AddNewTeacher/AddNewTeacherPage";
import AddNewClassPage from "../pages/ClassPage/AddNewClassPage/AddNewClassPage";
import SubjectPage from "../pages/SettingsPage/SubjectPage/SubjectPage";
import AddSubjectPage from "../pages/SettingsPage/SubjectPage/AddSubjectPage";
import AddNewStudentPage from "../pages/StudentsPage/AddNewStudentPage/AddNewStudentPage";
import ExamResultPage from "../pages/ExamPage/ExamResultPage/ExamResultPage";
import ExamResultSlugPage from "../pages/ExamPage/ExamResultPage/ExamResultSlugPage/ExamResultSlugPage";
import ExamResultIdPage from "../pages/ExamPage/ExamResultPage/ExamResultIdPage/ExamResultIdPage";

// axios.defaults.baseURL = "https://schools-crm-backend.onrender.com";
axios.defaults.baseURL = "http://localhost:3000";
const Router = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
          <Route
            path="/class/add"
            element={
              <ProtectedPage
                requiredPermissions={["write"]}
                requiredPrivileges={["manage_users"]}
                fallbackPath="/404"
              >
                <AddNewClassPage />
              </ProtectedPage>
            }
          />
          <Route path="/students" element={<StudentsPage />} />
          <Route
            path="/students/add"
            element={
              <ProtectedPage
                requiredPermissions={["write", "read"]}
                requiredPrivileges={["manage_users"]}
                fallbackPath="/404"
              >
                <AddNewStudentPage />
              </ProtectedPage>
            }
          />
          <Route path="/students/:slug" element={<StudentsSlugPage />} />

          <Route path="/teachers" element={<TeachersPage />} />
          <Route
            path="/teachers/add"
            element={
              <ProtectedPage
                requiredPermissions={["write"]}
                requiredPrivileges={["manage_users"]}
                fallbackPath="/404"
              >
                <AddNewTeacherPage />
              </ProtectedPage>
            }
          />
          <Route path="/teachers/:slug" element={<TeacherSlugPage />} />
          <Route path="/settings/accounts" element={<AccountsPage />} />
          <Route path="/settings/admins" element={<AdminsPage />} />
          <Route
            path="/settings/subjects"
            element={
              <ProtectedPage
                requiredPermissions={["read"]}
                requiredPrivileges={["view_reports"]}
                fallbackPath="/404"
              >
                <SubjectPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/subjects/add"
            element={
              <ProtectedPage
                requiredPermissions={["read", "write", "delete", "update"]}
                requiredPrivileges={[
                  "manage_users",
                  "view_reports",
                  "manage_roles",
                  "manage_permissions",
                ]}
                fallbackPath="/404"
              >
                <AddSubjectPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/admins/add"
            element={
              <ProtectedPage
                requiredPermissions={["read", "write", "delete", "update"]}
                requiredPrivileges={[
                  "manage_users",
                  "view_reports",
                  "manage_roles",
                  "manage_permissions",
                ]}
                fallbackPath="/404"
              >
                <AddAdminPage />
              </ProtectedPage>
            }
          />
          <Route path="/exam/exam-results" element={<ExamResultPage />} />
          <Route
            path="/exam/exam-results/:slug"
            element={<ExamResultSlugPage />}
          />
          <Route
            path="/exam/exam-results/:slug/:id"
            element={<ExamResultIdPage />}
          />
          <Route path="/profil" element={<ProfilPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default Router;
