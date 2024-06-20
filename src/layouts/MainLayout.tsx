import Header from "../component/Header";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const renderHeader = location.pathname === "/";
  return (
    <div>
      {renderHeader && <Header />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
