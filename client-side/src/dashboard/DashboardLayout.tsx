import { Outlet } from "react-router-dom";
import SideBar from "../component/SideBar";
import HeaderLogin from "../component/HeaderLogin";
import "../styles/Dashboard.css";

const DashboardLayout = () => {
  return (
    <>
      <HeaderLogin />
      <div className="dashboard-layout">
        <aside>
          <SideBar />
        </aside>
        <article style={{ width: "100%" }}>
          <Outlet />
        </article>
      </div>
    </>
  );
};

export default DashboardLayout;
