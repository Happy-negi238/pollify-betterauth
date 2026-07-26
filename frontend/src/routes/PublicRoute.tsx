import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return <div className="">Loading..</div>
    }

    if (session) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
