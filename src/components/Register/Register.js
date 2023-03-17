import "./Register.css";
import Auth from "../Auth/Auth";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register(props) {
  const link = (
    <Link className="auth__link app__button" to="/signin">
      Войти
    </Link>
  );

  const registerValidation = props.useFormWithValidation();
  const [userName] = useState(registerValidation.values.username);
  const [userEmail] = useState(registerValidation.values.email);
  const [userPassword] = useState(registerValidation.values.password);
  const [submitErrorText, setSubmitErrorText] = useState("");

  async function handleRegisterForm(e) {
    e.preventDefault();
    props
      .handleRegisterSubmit(
        registerValidation.values.username,
        registerValidation.values.email,
        registerValidation.values.password
      )
      .then(() => registerValidation.resetForm())
      .catch(err => {
        if (err === 409) {
          setSubmitErrorText("Пользователь с таким email уже существует.");
        } else {
          setSubmitErrorText("При регистрации пользователя произошла ошибка.");
        }
      });
  }

  return (
    <Auth
      title="Добро пожаловать!"
      formName="register__form"
      caption="Уже зарегистрированы?"
      buttonText="Зарегистрирваться"
      link={link}
      buttonDisability={!registerValidation.isValid}
      onFormSubmit={handleRegisterForm}
      submitErrorText={submitErrorText}
    >
      <label className="auth__input-label">
        Имя
        <input
          className={
            registerValidation.errors.username
              ? "auth__input auth__input_error"
              : "auth__input"
          }
          type="text"
          name="username"
          minLength="2"
          maxLength="30"
          required
          value={userName}
          placeholder="Введите ваше имя..."
          onChange={registerValidation.handleChange}
        />
        <span className="auth__error">
          {registerValidation.errors.username}
        </span>
      </label>
      <label className="auth__input-label">
        E-mail
        <input
          className={
            registerValidation.errors.email
              ? "auth__input auth__input_error"
              : "auth__input"
          }
          name="email"
          required
          type="email"
          value={userEmail}
          placeholder="Введите E-mail..."
          onChange={registerValidation.handleChange}
        />
        <span className="auth__error">{registerValidation.errors.email}</span>
      </label>
      <label className="auth__input-label">
        Пароль
        <input
          className={
            registerValidation.errors.password
              ? "auth__input auth__input_error"
              : "auth__input"
          }
          name="password"
          required
          type="password"
          value={userPassword}
          placeholder="Введите пароль..."
          onChange={registerValidation.handleChange}
        />
        <span className="auth__error">
          {registerValidation.errors.password}
        </span>
      </label>
    </Auth>
  );
}

export default Register;
