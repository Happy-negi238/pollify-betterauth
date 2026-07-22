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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-in" element={<Login />} />
    </Route>,
  ),
);

function App() {

  return (
    <>
      <Toaster
        position="top-right"
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
