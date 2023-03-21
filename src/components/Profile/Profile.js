import "./Profile.css";
import { useState, useContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);

  const [isInEdition, setIsInEdition] = useState(false);

  const profileValidation = props.useFormWithValidation();
  const [userName] = useState(profileValidation.values.username);
  const [userEmail] = useState(profileValidation.values.email);
  const [submitErrorText, setSubmitErrorText] = useState("");
  const [inputsIsUnactive, setInputsIsUnactive] = useState(false);
  const [successSubmitText, setSuccessSubmitText] = useState('');

  async function handleProfileFormSubmit(e) {
    e.preventDefault();
    setInputsIsUnactive(true);
    props
      .handleChangeUserDataSubmit(
        profileValidation.values.username ? profileValidation.values.username : currentUser.name,
        profileValidation.values.email ? profileValidation.values.email : currentUser.email
      )
      .then(() => setSuccessSubmitText('Данные профиля успешно изменены!'))
      .then(() => setIsInEdition(false))
      .then(() => profileValidation.resetForm())
      .catch(err => {
        if (err === 409) {
          setSubmitErrorText("Пользователь с таким email уже существует.");
        } else {
          setSubmitErrorText("При обновлении профиля произошла ошибка.");
        }
      })
      .finally(setInputsIsUnactive(false));
  }

  function handleEditButtonClick() {
    setIsInEdition(true);
  }
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        {isInEdition ? (
          <form
            className="profile__container"
            name="profile__form"
            onSubmit={handleProfileFormSubmit}
          >
            <label className="profile__label">
              Имя
              <input
                className={
                  profileValidation.errors.username
                    ? "profile__item profile__item_error"
                    : "profile__item"
                }
                type="text"
                name="username"
                minLength="2"
                maxLength="30"
                required
                value={userName}
                defaultValue={currentUser.name}
                placeholder="Введите новое имя..."
                onChange={profileValidation.handleChange}
                disabled={inputsIsUnactive}
              />
            </label>
            <span className="profile__error">
              {profileValidation.errors.username}
            </span>
            <label className="profile__label">
              E-mail
              <input
                className={
                  profileValidation.errors.email
                    ? "profile__item profile__item_error"
                    : "profile__item"
                }
                type="email"
                pattern="[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]{2,}"
                name="email"
                required
                defaultValue={currentUser.email}
                value={userEmail}
                placeholder="Введите новый E-mail..."
                onChange={profileValidation.handleChange}
                disabled={inputsIsUnactive}
              />
            </label>
            <span className="profile__error">
              {profileValidation.errors.email}
            </span>
            <div>
              <p className="profile__submit-error">{submitErrorText}</p>
              <button
                disabled={
                  !profileValidation.isValid ||
                  (currentUser.name === profileValidation.values.username &&
                    currentUser.email === profileValidation.values.email) ||
                  (currentUser.name === profileValidation.values.username &&
                    !profileValidation.values.email) ||
                  (!profileValidation.values.username &&
                    currentUser.email === profileValidation.values.email)
                }
                type="submit"
                className="profile__save-button app__button"
              >
                Сохранить
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile__container">
              <div className="profile__text-container">
                <p className="profile__item">Имя</p>
                <p className="profile__item">{currentUser.name}</p>
              </div>
              <div className="profile__text-container">
                <p className="profile__item">E-mail</p>
                <p className="profile__item">{currentUser.email}</p>
              </div>
            </div>
            <p className="profile__success-message">{successSubmitText}</p>
              <button
                type="button"
                className="profile__edit-button app__button"
                onClick={handleEditButtonClick}
              >
                Редактировать
              </button>
            <button
              className="profile__logout-button app__button"
              onClick={props.handleLogoutButtonClick}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Profile;
