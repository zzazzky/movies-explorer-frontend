import "./Login.css";
import Auth from "../Auth/Auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import mainApi from "../../utils/MainApi";

function Login(props) {
  const link = (
    <Link className="auth__link app__button" to="/signup">
      Регистрация
    </Link>
  );

  const loginValidation = props.useFormWithValidation();
  const [userEmail, setUserEmail] = useState(loginValidation.values.email);
  const [userPassword, setUserPassword] = useState(loginValidation.values.password);
  async function handleLoginFormSubmit(e) {
    e.preventDefault();
    try {
      await props.handleLoginSubmit(loginValidation.values.email, loginValidation.values.password)
} catch(err) {console.log(err)}
  loginValidation.resetForm();
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
    >
      <label className="auth__input-label">
        E-mail
        <input
          className={loginValidation.errors.email ? "auth__input auth__input_error" : "auth__input"}
          name="email"
          required
          type="email"
          value={userEmail}
          onChange={loginValidation.handleChange}
          placeholder="Введите E-mail..."
        />
        <span className="auth__error">{loginValidation.errors.email}</span>
      </label>
      <label className="auth__input-label">
        Пароль
        <input
          className={loginValidation.errors.password ? "auth__input auth__input_error" : "auth__input"}
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
