class MoviesApi {
  constructor(apiSettings) {
    this._baseUrl = apiSettings.baseUrl;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  }

  _request(url, options) {
    return fetch(url, options)
      .then(res => this._checkResponse(res));
  }

  getAllMovies() {
    return this._request(this._baseUrl, {
      method: "GET",
    })
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default moviesApi;