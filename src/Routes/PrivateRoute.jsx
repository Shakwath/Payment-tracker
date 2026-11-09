import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

/**
 * PrivateRoute Guard
 * Strictly enforces Firebase Authentication. Redirects unauthenticated users to /signin.
 */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
