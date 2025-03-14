import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "axios";
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
import AddNewTeacherPage from "../pages/TeachersPage/AddNewTeacher/AddNewTeacherPage";
import AddNewClassPage from "../pages/ClassPage/AddNewClassPage/AddNewClassPage";
import SubjectPage from "../pages/SettingsPage/SubjectPage/SubjectPage";
import AddSubjectPage from "../pages/SettingsPage/SubjectPage/AddSubjectPage";
import AddNewStudentPage from "../pages/StudentsPage/AddNewStudentPage/AddNewStudentPage";
import ExamResultPage from "../pages/ExamPage/ExamResultPage/ExamResultPage";
import ExamResultSlugPage from "../pages/ExamPage/ExamResultPage/ExamResult_Slug_Page/ExamResultSlugPage";
import ExamResultIdPage from "../pages/ExamPage/ExamResultPage/ExamResult_Id_Page/ExamResultIdPage";
import AddExamResultPage from "../pages/ExamPage/ExamResultPage/Add_ExamResult_Page/AddExamResultPage";
import Edit_ExamResult_Page from "../pages/ExamPage/ExamResultPage/Edit_ExamResult_Page/Edit_ExamResult_Page";
import SecretPage from "../pages/SecretPage";
import RatingPage from "../pages/ExamPage/RatingPage/RatingPage";
import Top_Student_Ratings_Page from "../pages/ExamPage/RatingPage/Top_Student_Ratings_Page";

// axios.defaults.baseURL = "https://schools-crm-node-1.onrender.com";
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
                fallbackPath="/secret"
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
                fallbackPath="/secret"
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
                fallbackPath="/secret"
              >
                <AddNewTeacherPage />
              </ProtectedPage>
            }
          />
          <Route path="/teachers/:slug" element={<TeacherSlugPage />} />
          <Route path="/settings/accounts" element={<AccountsPage />} />
          <Route
            path="/settings/admins"
            element={
              <ProtectedPage
                requiredPermissions={["read", "write", "delete", "update"]}
                requiredPrivileges={[
                  "manage_users",
                  "view_reports",
                  "manage_roles",
                  "manage_permissions",
                ]}
                fallbackPath="/secret"
              >
                <AdminsPage />
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
                fallbackPath="/secret"
              >
                <AddAdminPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings/subjects"
            element={
              <ProtectedPage
                requiredPermissions={["read"]}
                requiredPrivileges={["view_reports"]}
                fallbackPath="/secret"
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
                fallbackPath="/secret"
              >
                <AddSubjectPage />
              </ProtectedPage>
            }
          />

          <Route path="/exam/exam-results" element={<ExamResultPage />} />
          <Route
            path="/exam/exam-results/add"
            element={
              <ProtectedPage
                requiredPermissions={["read", "write"]}
                requiredPrivileges={["view_reports", "manage_users"]}
                fallbackPath="/secret"
              >
                <AddExamResultPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/exam/exam-results/edit/:id"
            element={
              <ProtectedPage
                requiredPermissions={["read", "update"]}
                requiredPrivileges={["view_reports", "manage_users"]}
                fallbackPath="/secret"
              >
                <Edit_ExamResult_Page />
              </ProtectedPage>
            }
          />
          <Route
            path="/exam/exam-results/:slug"
            element={<ExamResultSlugPage />}
          />
          <Route
            path="/exam/exam-results/:slug/:id"
            element={<ExamResultIdPage />}
          />
          <Route path="/ratings" element={<RatingPage />} />
          <Route path="/ratings/top" element={<Top_Student_Ratings_Page />} />
          <Route path="/profil" element={<ProfilPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/secret" element={<SecretPage />}></Route>
      </Routes>
    </>
  );
};

export default Router;
