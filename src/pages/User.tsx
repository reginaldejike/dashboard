import Card from "../component/Card";
import img1 from "../assets/cardImg1.png";
import img2 from "../assets/cardImg2.png";
import img3 from "../assets/cardImg3.png";
import img4 from "../assets/cardImg4.png";
import "../styles/User.css";
import Table from "../component/Table";

const User = () => {
  return (
    <div className="dashboard-container">
      <p className="page-title">Users</p>
      <div className="card-display">
        <Card
          image={img1}
          title="Users"
          figure="2,453"
          background="rgba(223, 24, 255, 0.1)"
        />
        <Card
          image={img2}
          title="Active users"
          figure="2,453"
          background="rgba(223, 24, 255, 0.1)"
        />
        <Card
          image={img3}
          title="users with loans"
          figure="12,453"
          background="rgba(223, 24, 255, 0.1)"
        />
        <Card
          image={img4}
          title="users with savings"
          figure="102,453"
          background="rgba(223, 24, 255, 0.1)"
        />
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
};

export default User;
