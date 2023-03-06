import "./Profile.css";
import { useState } from "react";

function Profile() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  function handleUserEmailChange(e) {
    setUserEmail(e.target.value);
  }

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form" name="profile__form">
        <label className="profile__input-label">
          Имя
          <input
            className="profile__input"
            type="text"
            name="profile-username"
            minLength="2"
            maxLength="30"
            required
            value={userName}
            placeholder="Введите новое имя..."
            onChange={handleUserNameChange}
          />
        </label>
        <span className="profile__error"></span>
        <label className="profile__input-label">
          E-mail
          <input
            className="profile__input"
            type="email"
            name="profile-email"
            required
            value={userEmail}
            placeholder="Введите новый E-mail..."
            onChange={handleUserEmailChange}
          />
        </label>
        <span className="profile__error"></span>
        <button type="submit" className="profile__edit-button app__button">
          Редактировать
        </button>
      </form>
      <button className="profile__logout-button app__button">
        Выйти из аккаунта
      </button>
    </main>
  );
}

export default Profile;
