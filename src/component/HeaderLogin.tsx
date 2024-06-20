import { FaCaretDown, FaMagnifyingGlass, FaRegBell } from "react-icons/fa6";
import logo from "../assets/acme-corp.svg";
import "../styles/HeaderLogin.css";
import { Link } from "react-router-dom";
import img from "../assets/image 4.png";

const HeaderLogin = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="login-header">
          <div className="header-logo">
            <img src={logo} alt="" width={150} />
          </div>
          <form>
            <div className="search-input">
              <input
                type="text"
                className="input-field"
                placeholder="Search for anything"
              />
              <button className="search-btn">
                <FaMagnifyingGlass />
              </button>
            </div>
          </form>
          <div className="user-info">
            <Link to={"#"} className="doc">
              Docs
            </Link>
            <div>
              <FaRegBell className="bell" />
            </div>
            <img src={img} alt="" className="pro-img" />
            <div className="settings">
              <p>Reginald</p>
              <FaCaretDown className="down" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderLogin;
