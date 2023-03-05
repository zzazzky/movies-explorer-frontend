import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <main className="notFound">
      <h1 className="notFound__title">404</h1>
      <p className="notFound__text">Страница не найдена</p>
      <p className="notFound__return" onClick={goBack}>
        Назад
      </p>
    </main>
  );
}

export default NotFound;
