import "./Login.css";
import Auth from "../Auth/Auth";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login(props) {
  const link = (
    <Link className="auth__link app__button" to="/signup">
      Регистрация
    </Link>
  );

  const loginValidation = props.useFormWithValidation();
  const [userEmail] = useState(loginValidation.values.email);
  const [userPassword] = useState(loginValidation.values.password);
  const [submitErrorText, setSubmitErrorText] = useState("");

  async function handleLoginFormSubmit(e) {
    e.preventDefault();
    props
      .handleLoginSubmit(
        loginValidation.values.email,
        loginValidation.values.password
      )
      .then(() => loginValidation.resetForm())
      .catch(err => {
        if (err === 401) {
          setSubmitErrorText("Вы ввели неправильный логин или пароль.");
        } else {
          setSubmitErrorText(
            "При авторизации произошла ошибка. Токен не передан или передан не в том формате. "
          );
        }
      });
  }

  return (
    <Auth
      title="Рады видеть!"
      formName="login__form"
      buttonText="Войти"
      caption="Еще не зарегистрированы?"
      link={link}
      onFormSubmit={handleLoginFormSubmit}
      buttonDisability={!loginValidation.isValid}
      submitErrorText={submitErrorText}
    >
      <label className="auth__input-label">
        E-mail
        <input
          className={
            loginValidation.errors.email
              ? "auth__input auth__input_error"
              : "auth__input"
          }
          name="email"
          required
          type="email"
          pattern="[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]{2,}"
          value={userEmail}
          onChange={loginValidation.handleChange}
          placeholder="Введите E-mail..."
        />
        <span className="auth__error">{loginValidation.errors.email}</span>
      </label>
      <label className="auth__input-label">
        Пароль
        <input
          className={
            loginValidation.errors.password
              ? "auth__input auth__input_error"
              : "auth__input"
          }
          name="password"
          required
          type="password"
          value={userPassword}
          onChange={loginValidation.handleChange}
          placeholder="Введите пароль..."
        />
        <span className="auth__error">{loginValidation.errors.password}</span>
      </label>
    </Auth>
  );
}

export default Login;
