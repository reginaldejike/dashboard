import { Link } from "react-router-dom";
import logo from "../assets/acme-corp.svg";
import "../styles/Homepage.css";
const Homepage = () => {
  return (
    <>
      <section className="hero">
        <nav className="hero-logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          <div className="header-links">
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Register</Link>
          </div>
        </nav>
        <div className="hero-content">
          <h1>School Management System</h1>
          <p>Handle Your school activities</p>
          <p>
            From result management to Admin management to staff attendance
            system
          </p>
        </div>
      </section>
    </>
  );
};

export default Homepage;
