import "./Promo.css";
import picturePath from "../../images/promo__picture.svg";

function Promo() {
  return (
    <div className="promo">
      <img
        className="promo__picture"
        src={picturePath}
        alt='буква "П" в орнаменте'
      />
      <h1 className="promo__headline">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </div>
  );
}

export default Promo;
