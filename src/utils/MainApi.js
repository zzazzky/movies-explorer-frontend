class MainApi {
  constructor(apiSettings) {
    this._baseUrl = apiSettings.baseUrl;
    this._headers = apiSettings.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._checkResponse(res));
  }

  createUser(userName, userEmail, userPassword) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: userEmail,
        name: userName,
        password: userPassword,
      }),
    }).then((res) => res);
  }

  login(userEmail, userPassword) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    }).then((res) => res);
  }

  getCurrentUser() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res);
  }

  changeUserData(userName, userEmail) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name: userName, email: userEmail }),
    }).then((res) => res);
  }

  logout() {
    return this._request(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res);
  }

  getMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res);
  }

  likeMovie(movieData) {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: `https://api.nomoreparties.co/${movieData.image.url}`,
        trailerLink: movieData.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movieData.image.formats.thumbnail.url}`,
        movieId: movieData.id,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
      }),
    }).then((res) => res);
  }

  dislikeMovie(id) {
    return this._request(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => res);
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

export default mainApi;
