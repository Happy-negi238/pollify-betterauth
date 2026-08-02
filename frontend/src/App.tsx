import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/signup/SignUp";
import Login from "./pages/auth/login/Login";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./routes/PublicRoute";
import Polls from "./pages/polls/Polls";
import ProtectedRoute from "./routes/ProtectedRoute";
import PollDetails from "./pages/poll-details/PollDetails";
import Dashboard from "./pages/dashboard/Dashboard";
import PollVote from "./pages/poll-vote/PollVote";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="polls" element={<Polls />} />
        <Route path="poll-detail/:dashboard_code" element={<PollDetails />} />
      </Route>
      <Route path="vote/:poll_code" element={<PollVote />} />

      <Route element={<PublicRoute />}>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="log-in" element={<Login />} />
      </Route>
    </Route>,
  ),
);

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#fff",
            color: "#0f172a",
          },
          success: {
            style: {
              border: "1px solid #86efac",
              background: "#f0fdf4",
              color: "#15803d",
            },
          },
          error: {
            style: {
              border: "1px solid #fca5a5",
              background: "#fef2f2",
              color: "#dc2626",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
