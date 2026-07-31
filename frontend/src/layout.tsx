import Header from "./pages/header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./pages/footer/Footer";

const Layout = () => {
  const { pathname } = useLocation();

  const hideComponent = pathname.startsWith("/vote");
  return (
    <>
      {!hideComponent && <Header />}
      <Outlet />
      {!hideComponent && <Footer />}
    </>
  );
};

export default Layout;
