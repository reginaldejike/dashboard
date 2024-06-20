import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import {
  BiBarChart,
  BiBookContent,
  BiBriefcase,
  BiHome,
  BiMoney,
  BiUserCheck,
  BiUserX,
} from "react-icons/bi";
import { FaDivide, FaHandshake, FaSpinner, FaUserGear } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
import { PiPiggyBank } from "react-icons/pi";
import { MdSavings } from "react-icons/md";
import { GiScrollUnfurled, GiTwoCoins } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";

import { IoStatsChart } from "react-icons/io5";

const SideBar = () => {
  return (
    <>
      <nav className="side-bar">
        <NavLink to={"switch-oganisation"} className="nav-item">
          <BiBriefcase /> Switch Organisation
        </NavLink>
        <NavLink to={"/dashboard"} className="nav-item" end>
          <BiHome /> Dashboard
        </NavLink>
        <p>Customer</p>
        <NavLink to={"user"} className="nav-item">
          <HiUsers /> User
        </NavLink>
        <NavLink to={"guarantor"} className="nav-item">
          <HiUsers /> Guarantors
        </NavLink>
        <NavLink to={"loans"} className="nav-item">
          <TbMoneybag /> Loans
        </NavLink>
        <NavLink to={"decision"} className="nav-item">
          <FaHandshake /> Decision Models
        </NavLink>
        <NavLink to={"saving"} className="nav-item">
          <PiPiggyBank /> Savings
        </NavLink>
        <NavLink to={"loan-request"} className="nav-item">
          <BiMoney /> Loan Requests
        </NavLink>
        <NavLink to={"whitelist"} className="nav-item">
          <BiUserCheck /> Whitelist
        </NavLink>
        <NavLink to={"karma"} className="nav-item">
          <BiUserX /> Karma
        </NavLink>
        <p>Business</p>
        <NavLink to={"organisation"} className="nav-item">
          <BiBriefcase /> Organisation
        </NavLink>
        <NavLink to={"loan-product"} className="nav-item">
          <BiMoney /> Loan Products
        </NavLink>
        <NavLink to={"saving-product"} className="nav-item">
          <MdSavings /> Savings Product
        </NavLink>
        <NavLink to={"fees"} className="nav-item">
          <GiTwoCoins /> Fees and Charges
        </NavLink>
        <NavLink to={"transaction"} className="nav-item">
          <GrTransaction /> Transactions
        </NavLink>
        <NavLink to={"services"} className="nav-item">
          <FaSpinner /> Services
        </NavLink>
        <NavLink to={"service Account"} className="nav-item">
          <FaUserGear /> Service Account
        </NavLink>
        <NavLink to={"settlements"} className="nav-item">
          {" "}
          <GiScrollUnfurled /> Settlements
        </NavLink>
        <NavLink to={"report"} className="nav-item">
          {" "}
          <IoStatsChart /> Reports
        </NavLink>
        <p>SETTINGS</p>
        <NavLink to={"preferences"} className="nav-item">
          {" "}
          <BiBarChart /> Preferences
        </NavLink>
        <NavLink to={"fee-pricing"} className="nav-item">
          {" "}
          <FaDivide /> Fees and Pricing
        </NavLink>
        <NavLink to={"audit"} className="nav-item">
          {" "}
          <BiBookContent /> Audit Logs
        </NavLink>
      </nav>
    </>
  );
};

export default SideBar;
