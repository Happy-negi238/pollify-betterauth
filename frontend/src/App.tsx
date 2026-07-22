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
  return <RouterProvider router={router} />;
}

export default App;
