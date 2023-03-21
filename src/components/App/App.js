import { React, useCallback, useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import mainApi from "../../utils/MainApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import AuthorizationRouteElement from "../AuthorizationRouteElement/AuthorizationRouteElement";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    location.pathname === "/movies" ||
      location.pathname === "/saved-movies" ||
      location.pathname === "/profile"
      ? true
      : false
  );
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    checkAuthorization();
  }, []);

  function checkAuthorization() {
    return mainApi
      .getCurrentUser()
      .then(user =>
        setCurrentUser({
          _id: user._id,
          name: user.name,
          email: user.email,
        })
      )
      .then(() => setLoggedIn(true))
      .catch(err => {
        setLoggedIn(false);
        if (err === 401) {
          console.log("Требуется авторизация");
        } else {
          console.log("500 На сервере произошла ошибка.");
        }
      });
  }

  function login(email, password) {
    return mainApi
      .login(email, password)
      .then(() => checkAuthorization())
      .then(() => navigate("/movies"));
  }

  function signup(name, email, password) {
    return mainApi.createUser(name, email, password).then(res => {
      return login(email, password);
    });
  }

  function changeUserData(name, email) {
    return mainApi.changeUserData(name, email).then(user =>
      setCurrentUser({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    );
  }

  function logout() {
    mainApi
      .logout()
      .then(() => setLoggedIn(false))
      .then(() => localStorage.removeItem("movies"))
      .then(() => savedMovies([]))
      .then(() =>
        setCurrentUser({
          _id: "",
          name: "",
          email: "",
        })
      )
      .then(() => navigate("/"))
      .catch(err => console.log("500 На сервере произошла ошибка."));
  }

  function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = e => {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(() => {
      setValues({});
      setErrors({});
      setIsValid(false);
    }, [setValues, setErrors, setIsValid]);

    return { values, errors, handleChange, isValid, resetForm };
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
              component={Movies}
              loggedIn={loggedIn} 
              setSavedMovies={setSavedMovies}
              savedMovies={savedMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                component={SavedMovies}
                loggedIn={loggedIn}
                setSavedMovies={setSavedMovies}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                component={Profile}
                loggedIn={loggedIn}
                useFormWithValidation={useFormWithValidation}
                handleChangeUserDataSubmit={changeUserData}
                handleLogoutButtonClick={logout}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <AuthorizationRouteElement
                component={Login}
                loggedIn={loggedIn}
                useFormWithValidation={useFormWithValidation}
                handleLoginSubmit={login}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <AuthorizationRouteElement
                component={Register}
                loggedIn={loggedIn}
                useFormWithValidation={useFormWithValidation}
                handleRegisterSubmit={signup}
              />
            }
          />
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
