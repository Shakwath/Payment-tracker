import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

/**
 * RoleRoute Guard
 * Enforces strict Role-Based Access Control (RBAC) for Admin, Guardian, and Teacher portals.
 */
const RoleRoute = ({ allowedRoles = [], children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const activeRole = (role || user?.role || "admin").toLowerCase();

  if (allowedRoles.length > 0 && !allowedRoles.includes(activeRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;

