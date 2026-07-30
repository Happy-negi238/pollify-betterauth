import { useAuth } from "@/context/AuthContext";
import Loader from "@/loader";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return <Loader />
    }

    if (session) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
