import {React, useCallback, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  
  function login(email, password) {
    return mainApi
      .login(email, password)
      .then(res => console.log(res))
      .then(res => mainApi.getCurrentUser())
      .then(() => setLoggedIn(true))
      .catch(err => console.log(err));
  }

  function signup(name, email, password) {
    mainApi.createUser(name, email, password)
      .then(res => {
        return login(email, password);
      })
      .catch(err => console.log(err));
  }
  function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage});
      setIsValid(target.closest("form").checkValidity());
    }

    const resetForm = useCallback(
      () => {
        setValues({});
        setErrors({});
        setIsValid(false);
      },
      [setValues, setErrors, setIsValid]
    );
    return { values, errors, handleChange, isValid, resetForm }
  }

  function findAllMovies() {
    moviesApi
    .getAllMovies()
    .then(res => localStorage.setItem('movies', JSON.stringify(res)))
    .catch(err => console.log(`Ошибка ${err.status}: ${err.message}`));
  }

  return (
    <div className="app">
      {location.pathname === "/" && <Header loggedIn={false} />}
      {(location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile") && <Header loggedIn={true} />}
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/movies" element={<Movies findMovies={findAllMovies} />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login useFormWithValidation={useFormWithValidation} handleLoginSubmit={login} />} />
        <Route path="/signup" element={<Register useFormWithValidation={useFormWithValidation} handleRegisterSubmit={signup} />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
      {(location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile") && <Footer />}
    </div>
  );
}

export default App;
