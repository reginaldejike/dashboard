import Header from "../component/Header";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  // const renderHeader = location.pathname === "/login";
  return (
    <>
      {location.pathname === "/login" && <Header />}
      {location.pathname === "/signup" && <Header />}
      <Outlet />
    </>
  );
};

export default MainLayout;
