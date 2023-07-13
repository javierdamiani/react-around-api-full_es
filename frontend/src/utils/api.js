import { API_BASE_URL } from "./config";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

    async getCardList(token) {
    try {
      const response = await fetch(`${this._baseUrl}/cards`, {
        headers: {
          ...this._headers,
          authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error:${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
 
  async getUserInfo(token) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        headers: {
          ...this._headers,
          authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error:${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

    async handleEditProfile(body, token) {
    const {name, about} = body;
    try {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          ...this._headers,
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      });
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error ${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

    async addCard(body, token) {
    const { title, link } = body;
    try {
      const response = await fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          ...this._headers,
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: title,
          link: link,
        }),
      });
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error ${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  
  async removeCard(cardId, onDeleteCard, token) {
    try {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          ...this._headers,
          authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        onDeleteCard();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async setUserAvatar(link, token) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          ...this._headers,
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: link,
        }),
      });
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error ${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async changeLikeCardStatus(cardId, isLiked, token) {
    try {
      let response;
      if (isLiked) {
        response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: {
            ...this._headers,
            authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: {
            ...this._headers,
            authorization: `Bearer ${token}`,
          },
        });
      }
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error ${response.status}`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

const api = new Api({
  baseUrl: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
