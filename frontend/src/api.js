import axios from 'axios'

const API = axios.create({
  // baseURL: 'http://localhost:8000/api'
  baseURL: 'https://group-social-ecards.herokuapp.com/api/'
})

export function login (username, password) {
  return API
    .post('auth/token/login/', {
      username: username,
      password: password
    })
    .then(res => res.data)
    .catch(error => {
      let errors = []
      if (error.response) {
        if (error.response.data.non_field_errors) {
          errors = errors.concat(error.response.data.non_field_errors)
        }
      }
      if (errors.length === 0) {
        errors.push('There was a problem logging in.')
      }
      throw new Error(errors[0])
    })
}

export function register (username, password) {
  return API
    .post('auth/users/', {
      username: username,
      password: password
    })
    .then(res => {
      return login(username, password)
    })
    .catch(error => {
      let errors = []
      if (error.response) {
        const data = error.response.data
        if (data.username) {
          errors = errors.concat(data.username)
        }
        if (data.password) {
          errors = errors.concat(data.password)
        }
      }
      if (errors.length === 0) {
        errors.push('There was a problem registering.')
      }
      const err = new Error(errors[0])
      throw err
    })
}

export function getCards (token) {
  return API
    .get('cards/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}

export function getMyCards (token, username) {
  return API
    .get('cards/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
    // .then(data => {
    //   const cards = []
    //   for (const card of cards) {
    //     if (username === card.user) {
    //       cards.push(card)
    //     }
    //     cards.push(card)
    //   }
    // }
    // )
}

export function getCardDetail (token, pk) {
  return API
    .get(`card-detail/${pk}/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}

export function deleteCard (token, pk) {
  return API
    .delete(`card-detail/${pk}/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    // .then(res => res.data)
}

export function createCard (token, backgroundColor, font, border, backgroundImage, title, message) {
  return API
    .post('cards/', {
      background: backgroundColor,
      font: font,
      border: border,
      title: title,
      image_front: backgroundImage,
      image_back: null,
      message: message
    },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}

export function updateCard (token, pk, backgroundColor, font, border, backgroundImage, title, message) {
  return API
    .patch(`card-detail/${pk}/`, {
      background: backgroundColor,
      font: font,
      border: border,
      title: title,
      image_front: backgroundImage,
      image_back: null,
      message: message
    },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}
