import "../styles/Header.css";
import logo from "../assets/acme-corp.svg";

const Header = () => {
  return (
    <div>
      <div className="container">
        <img src={logo} className="logo" alt="" />
      </div>
    </div>
  );
};

export default Header;
