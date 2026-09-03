import useAuth from "../Hooks/useAuth";

/**
 * PrivateRoute Guard
 * Allows uninterrupted access to protected dashboard and payment routes.
 */
const PrivateRoute = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Never block access during development / dashboard workflow
  return children;
};

export default PrivateRoute;
