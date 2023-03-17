import "./Auth.css";
import logoPath from "../../images/logo.svg";

function Auth(props) {
  return (
    <main className="auth">
      <img className="auth__logo" src={logoPath} alt="Логотип проект" />
      <h1 className="auth__title">{props.title}</h1>
      <form
        className="auth__form"
        name={props.formName}
        onSubmit={props.onFormSubmit}
      >
        <div className="auth__inputs">{props.children}</div>
        <div>
          <p className="auth__submit-error">{props.submitErrorText}</p>
          <button
            disabled={props.buttonDisability}
            type="submit"
            className="auth__submit-button app__button"
          >
            {props.buttonText}
          </button>
        </div>
      </form>
      <p className="auth__caption">
        {props.caption} {props.link}{" "}
      </p>
    </main>
  );
}

export default Auth;
