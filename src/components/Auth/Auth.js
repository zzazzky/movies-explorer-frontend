import "./Auth.css";
import logoPath from "../../images/logo.svg";

function Auth(props) {
  return (
    <main className="auth">
      <img className="auth__logo" src={logoPath} alt="Логотип проект" />
      <h1 className="auth__title">{props.title}</h1>
      <form className="auth__form" name={props.formName}>
        <div className="auth__inputs">{props.children}</div>
        <button type="submit" className="auth__submit-button button">
          {props.buttonText}
        </button>
      </form>
      <p className="auth__caption">
        {props.caption} {props.link}{" "}
      </p>
    </main>
  );
}

export default Auth;
