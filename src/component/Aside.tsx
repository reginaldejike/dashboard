import pablo from "../assets/pablo-sign-in.svg";
import "../styles/Aside.css";

const Aside = () => {
  return (
    <>
      <div className="image-section">
        <img src={pablo} alt="pablo" />
      </div>
    </>
  );
};

export default Aside;
