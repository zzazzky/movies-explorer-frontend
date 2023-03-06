import "./Login.css";
import Auth from "../Auth/Auth";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const link = (
    <Link className="auth__link app__button" to="/signup">
      Регистрация
    </Link>
  );
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function handleUserEmailChange(e) {
    setUserEmail(e.target.value);
  }

  function handleUserPasswordChange(e) {
    setUserPassword(e.target.value);
  }

  return (
    <Auth
      title="Рады видеть!"
      formName="login__form"
      buttonText="Войти"
      caption="Еще не зарегистрированы?"
      link={link}
    >
      <label className="auth__input-label">
        E-mail
        <input
          className="auth__input"
          name="login-email"
          required
          type="email"
          value={userEmail}
          onChange={handleUserEmailChange}
          placeholder="Введите E-mail..."
        />
        <span className="auth__error"></span>
      </label>
      <label className="auth__input-label">
        Пароль
        <input
          className="auth__input"
          name="login-password"
          required
          type="password"
          value={userPassword}
          onChange={handleUserPasswordChange}
          placeholder="Введите пароль..."
        />
        <span className="auth__error"></span>
      </label>
    </Auth>
  );
}

export default Login;
