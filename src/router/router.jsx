import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardOverview from "../Pages/Dashboard/DashboardOverview";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/Payment/PaymentHistory";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import About from "../Pages/About/About";
import PrivateRoute from "../Routes/PrivateRoute";
import RoleRoute from "../Routes/RoleRoute";
import ErrorPage from "../Components/Common/ErrorPage";

// Admin Dashboard Pages
import StudentsManagement from "../Pages/Dashboard/Admin/StudentsManagement";
import GuardiansManagement from "../Pages/Dashboard/Admin/GuardiansManagement";
import SemestersManagement from "../Pages/Dashboard/Admin/SemestersManagement";
import FeeManagement from "../Pages/Dashboard/Admin/FeeManagement";
import PaymentsManagement from "../Pages/Dashboard/Admin/PaymentsManagement";
import PendingVerification from "../Pages/Dashboard/Admin/PendingVerification";
import ExpensesManagement from "../Pages/Dashboard/Admin/ExpensesManagement";
import TeachersManagement from "../Pages/Dashboard/Admin/TeachersManagement";
import TeacherSalaries from "../Pages/Dashboard/Admin/TeacherSalaries";
import ReportsExport from "../Pages/Dashboard/Admin/ReportsExport";
import AuditLogs from "../Pages/Dashboard/Admin/AuditLogs";
import SystemSettings from "../Pages/Dashboard/Admin/SystemSettings";
import UserRolesManagement from "../Pages/Dashboard/Admin/UserRolesManagement";

// Guardian Dashboard Pages
import MyStudents from "../Pages/Dashboard/Guardian/MyStudents";
import PayFees from "../Pages/Dashboard/Guardian/PayFees";
import GuardianPaymentHistory from "../Pages/Dashboard/Guardian/GuardianPaymentHistory";
import GuardianReceipts from "../Pages/Dashboard/Guardian/GuardianReceipts";

// Teacher Dashboard Pages
import TeacherProfile from "../Pages/Dashboard/Teacher/TeacherProfile";
import TeacherSubjects from "../Pages/Dashboard/Teacher/TeacherSubjects";
import TeacherSalaryHistory from "../Pages/Dashboard/Teacher/TeacherSalaryHistory";
import InputStudentResult from "../Pages/Dashboard/Teacher/InputStudentResult";

// Shared Dashboard Pages
import NotificationsPage from "../Pages/Dashboard/NotificationsPage";

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
        path: "forgetpassword",
        element: <ForgotPassword />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
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
      // Admin-Only Protected Routes
      {
        path: "user-roles",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <UserRolesManagement />
          </RoleRoute>
        ),
      },
      {
        path: "students",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <StudentsManagement />
          </RoleRoute>
        ),
      },
      {
        path: "guardians",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <GuardiansManagement />
          </RoleRoute>
        ),
      },
      {
        path: "semesters",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <SemestersManagement />
          </RoleRoute>
        ),
      },
      {
        path: "fee-management",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <FeeManagement />
          </RoleRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <PaymentsManagement />
          </RoleRoute>
        ),
      },
      {
        path: "pending-verification",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <PendingVerification />
          </RoleRoute>
        ),
      },
      {
        path: "expenses",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ExpensesManagement />
          </RoleRoute>
        ),
      },
      {
        path: "teachers",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <TeachersManagement />
          </RoleRoute>
        ),
      },
      {
        path: "teacher-salaries",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <TeacherSalaries />
          </RoleRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ReportsExport />
          </RoleRoute>
        ),
      },
      {
        path: "audit-logs",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AuditLogs />
          </RoleRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <SystemSettings />
          </RoleRoute>
        ),
      },
      // Guardian Routes
      {
        path: "my-students",
        element: (
          <RoleRoute allowedRoles={["guardian", "admin"]}>
            <MyStudents />
          </RoleRoute>
        ),
      },
      {
        path: "pay-fees",
        element: (
          <RoleRoute allowedRoles={["guardian", "admin"]}>
            <PayFees />
          </RoleRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <RoleRoute allowedRoles={["guardian", "admin"]}>
            <GuardianPaymentHistory />
          </RoleRoute>
        ),
      },
      {
        path: "receipts",
        element: (
          <RoleRoute allowedRoles={["guardian", "admin"]}>
            <GuardianReceipts />
          </RoleRoute>
        ),
      },
      {
        path: "profile",
        element: <UpdateProfile />,
      },
      // Teacher Routes
      {
        path: "my-profile",
        element: (
          <RoleRoute allowedRoles={["teacher", "admin"]}>
            <TeacherProfile />
          </RoleRoute>
        ),
      },
      {
        path: "my-subjects",
        element: (
          <RoleRoute allowedRoles={["teacher", "admin"]}>
            <TeacherSubjects />
          </RoleRoute>
        ),
      },
      {
        path: "salary-history",
        element: (
          <RoleRoute allowedRoles={["teacher", "admin"]}>
            <TeacherSalaryHistory />
          </RoleRoute>
        ),
      },
      {
        path: "input-student-result",
        element: (
          <RoleRoute allowedRoles={["teacher", "admin"]}>
            <InputStudentResult />
          </RoleRoute>
        ),
      },
      // Shared Notifications Route
      {
        path: "notifications",
        element: <NotificationsPage />,
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
