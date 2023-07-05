class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  }

  _makeRequest(method, url, body) {
    return fetch(url, {
      method: method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  getCardList() {
    return this._makeRequest("GET", `${this._baseUrl}/cards`);
  }

  getUserInfo() {
    return this._makeRequest("GET", `${this._baseUrl}/users/me`);
  }

  handleEditProfile({ name, about }) {
    return this._makeRequest("PATCH", `${this._baseUrl}/users/me`, {
      name,
      about,
    });
  }

  addCard({ name, link }) {
    return this._makeRequest("POST", `${this._baseUrl}/cards`, { name, link });
  }

  removeCard(cardId) {
    return this._makeRequest("DELETE", `${this._baseUrl}/cards/${cardId}`);
  }

  setUserInfo({ name, about }) {
    return this._makeRequest("PATCH", `${this._baseUrl}/users/me`, {
      name,
      about,
    });
  }

  setUserAvatar(avatar) {
    return this._makeRequest("PATCH", `${this._baseUrl}/users/me/avatar`, {
      avatar,
    });
  }

  changeLikeCardStatus(cardId, liked) {
    return liked ? this.addLike(cardId) : this.removeLike(cardId);
  }

  addLike(cardId) {
    return this._makeRequest("PUT", `${this._baseUrl}/cards/likes/${cardId}`);
  }

  removeLike(cardId) {
    return this._makeRequest(
      "DELETE",
      `${this._baseUrl}/cards/likes/${cardId}`
    );
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_cohort_03",
  headers: {
    authorization: "278fd53d-b84a-49c6-aef1-178b52806850",
    "Content-Type": "application/json",
  },
  groupId: "web_es_cohort_05",
});

export default api;
