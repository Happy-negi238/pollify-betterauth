import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = () => {
  const { session, loading } = useAuth()

  if (loading) {
    <div>Loading...</div>
  }

  if (!session) {
    return <Navigate to="/log-in" replace />
  }

  return <Outlet />
};

export default ProtectedRoute;
