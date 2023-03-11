class MainApi {
  constructor(apiSettings) {
    this._baseUrl = apiSettings.baseUrl;
    this._headers = apiSettings.headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}: ${res.message}`);
    }
  }

  _request(url, options) {
    return fetch(url, options)
      .then(res => this._checkResponse(res));
  }

  createUser(userName, userEmail, userPassword) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      сredentials: "include",
      body: JSON.stringify({ email: userEmail, name: userName, password: userPassword })
    })
     .then(res => res);
  }

  login(userEmail, userPassword) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      сredentials: "include",
      body: JSON.stringify({ email: userEmail, password: userPassword })
    })
     .then(res => res);
  }

  getCurrentUser() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      сredentials: "include",
    })
      .then(res => res);
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.diploma.gerasimova.nomoredomains.work",
  headers: { "Content-Type": "application/json", },
});

export default mainApi;