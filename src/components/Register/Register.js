import "./Register.css";
import Auth from "../Auth/Auth";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const link = (
    <Link className="auth__link app__button" to="/signin">
      Войти
    </Link>
  );
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");

  function handleUserEmailChange(e) {
    setUserEmail(e.target.value);
  }

  function handleUserPasswordChange(e) {
    setUserPassword(e.target.value);
  }

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }

  return (
    <Auth
      title="Добро пожаловать!"
      formName="register__form"
      buttonText="Зарегистрироваться"
      caption="Уже зарегистрированы?"
      link={link}
    >
      <label className="auth__input-label">
        Имя
        <input
          className="auth__input"
          type="text"
          name="register-username"
          minLength="2"
          maxLength="30"
          required
          value={userName}
          placeholder="Введите ваше имя..."
          onChange={handleUserNameChange}
        />
        <span className="auth__error"></span>
      </label>
      <label className="auth__input-label">
        E-mail
        <input
          className="auth__input"
          name="register-email"
          required
          type="email"
          value={userEmail}
          placeholder="Введите E-mail..."
          onChange={handleUserEmailChange}
        />
        <span className="auth__error"></span>
      </label>
      <label className="auth__input-label">
        Пароль
        <input
          className="auth__input"
          name="register-password"
          required
          type="password"
          value={userPassword}
          placeholder="Введите пароль..."
          onChange={handleUserPasswordChange}
        />
        <span className="auth__error"></span>
      </label>
    </Auth>
  );
}

export default Register;
