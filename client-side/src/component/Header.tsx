import "../styles/Header.css";
import logo from "../assets/acme-corp.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="container">
        <Link to={"/"}>
          <img src={logo} className="logo" alt="" />
        </Link>
      </nav>
    </div>
  );
};

export default Header;
