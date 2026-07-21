import "../styles/Card.css";
type Card = {
  image: string;
  title: string;
  figure: string;
  background: string;
};
const Card = ({ image, title, figure, background }: Card) => {
  return (
    <>
      <div className="card-wrapper">
        <div className="card-img-container" style={{ background: background }}>
          <img src={image} alt="" className="card-img" />
        </div>
        <p className="card-title"> {title} </p>
        <p className="card-figure"> {figure}</p>
      </div>
    </>
  );
};

export default Card;
