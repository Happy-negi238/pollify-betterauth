import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/loader";

const ProtectedRoute = () => {
  const { session, loading } = useAuth()

  if (loading) {
    return <Loader message="Verifying the session" />
  }

  if (!session) {
    return <Navigate to="/log-in" replace />
  }

  return <Outlet />
};

export default ProtectedRoute;
