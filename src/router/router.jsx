import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardOverview from "../Pages/Dashboard/DashboardOverview";

// Admin Role Pages
import StudentsPage from "../Pages/Dashboard/Admin/StudentsPage";
import GuardiansPage from "../Pages/Dashboard/Admin/GuardiansPage";
import TeachersPage from "../Pages/Dashboard/Admin/TeachersPage";
import SemestersPage from "../Pages/Dashboard/Admin/SemestersPage";
import FeeManagementPage from "../Pages/Dashboard/Admin/FeeManagementPage";
import PaymentsPage from "../Pages/Dashboard/Admin/PaymentsPage";
import PendingVerificationPage from "../Pages/Dashboard/Admin/PendingVerificationPage";
import ExpensesPage from "../Pages/Dashboard/Admin/ExpensesPage";
import TeacherSalariesPage from "../Pages/Dashboard/Admin/TeacherSalariesPage";
import ReportsPage from "../Pages/Dashboard/Admin/ReportsPage";
import AuditLogsPage from "../Pages/Dashboard/Admin/AuditLogsPage";
import NotificationsPage from "../Pages/Dashboard/Admin/NotificationsPage";
import SettingsPage from "../Pages/Dashboard/Admin/SettingsPage";

// Student Role Pages
import MyStudentsPage from "../Pages/Dashboard/Student/MyStudentsPage";
import PayFeesPage from "../Pages/Dashboard/Student/PayFeesPage";
import StudentPaymentHistoryPage from "../Pages/Dashboard/Student/StudentPaymentHistoryPage";
import ReceiptsPage from "../Pages/Dashboard/Student/ReceiptsPage";
import StudentProfilePage from "../Pages/Dashboard/Student/StudentProfilePage";

// Teacher Role Pages
import TeacherProfilePage from "../Pages/Dashboard/Teacher/TeacherProfilePage";
import MySubjectsPage from "../Pages/Dashboard/Teacher/MySubjectsPage";
import SalaryHistoryPage from "../Pages/Dashboard/Teacher/SalaryHistoryPage";
import InputStudentResultPage from "../Pages/Dashboard/Teacher/InputStudentResultPage";

import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/Payment/PaymentHistory";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import About from "../Pages/About/About";
import PrivateRoute from "../Routes/PrivateRoute";
import ErrorPage from "../Components/Common/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      // Admin Routes
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "guardians",
        element: <GuardiansPage />,
      },
      {
        path: "teachers",
        element: <TeachersPage />,
      },
      {
        path: "semesters",
        element: <SemestersPage />,
      },
      {
        path: "fee-management",
        element: <FeeManagementPage />,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
      },
      {
        path: "pending-verification",
        element: <PendingVerificationPage />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
      },
      {
        path: "teacher-salaries",
        element: <TeacherSalariesPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "audit-logs",
        element: <AuditLogsPage />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      // Student Routes
      {
        path: "my-students",
        element: <MyStudentsPage />,
      },
      {
        path: "pay-fees",
        element: <PayFeesPage />,
      },
      {
        path: "payment-history",
        element: <StudentPaymentHistoryPage />,
      },
      {
        path: "receipts",
        element: <ReceiptsPage />,
      },
      {
        path: "profile",
        element: <StudentProfilePage />,
      },
      // Teacher Routes
      {
        path: "my-profile",
        element: <TeacherProfilePage />,
      },
      {
        path: "my-subjects",
        element: <MySubjectsPage />,
      },
      {
        path: "salary-history",
        element: <SalaryHistoryPage />,
      },
      {
        path: "input-student-result",
        element: <InputStudentResultPage />,
      },
      {
        path: "*",
        element: <DashboardOverview />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;