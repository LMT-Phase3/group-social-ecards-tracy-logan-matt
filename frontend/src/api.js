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

export function getCards (token, path, page) {
  let apiPath = ''
  if (path === 'cards') {
    apiPath = `${path}/?limit=10&offset=${(page - 1) * 10}`
  } else {
    apiPath = `${path}/?page=${page}`
  }
  return API
    .get(apiPath, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data.results)
}

export function getMyCards (token) {
  return API
    .get('user-cards/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data.results)
}

export function getMyProfile (token) {
  return API
    .get('my-friends/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}

export function getUsers (token, path, page) {
  return API
    .get(`${path}/?page=${page}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data.results)
}

export function getAllUsers (token) {
  return API
    .get('users/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data.results)
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

export function getUserProfile (token, pk) {
  return API
    .get(`users-detail/${pk}`, {
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

export function createCard (token, backgroundColor, font, border, backgroundImage, title, message, fontColor, borderType, justify) {
  return API
    .post('cards/', {
      background: backgroundColor,
      font: font,
      border: border,
      title: title,
      image_front: backgroundImage,
      image_back: null,
      message: message,
      font_color: fontColor,
      border_type: borderType,
      justify: justify
    },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}

export function updateCard (token, pk, backgroundColor, font, border, backgroundImage, title, message, fontColor, borderType, justify) {
  return API
    .patch(`card-detail/${pk}/`, {
      background: backgroundColor,
      font: font,
      border: border,
      title: title,
      image_front: backgroundImage,
      image_back: null,
      message: message,
      font_color: fontColor,
      border_type: borderType,
      justify: justify
    },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}

export function updateUser (token, username, firstName, lastName, email, about, avatarImage) {
  return API
    .patch(`users-detail/${username}/`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      about: about,
      avatar: avatarImage
    },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}

export function addFriend (token, newUser) {
  return API
    .post('my-friends/', {
      username: newUser
    },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => (res.data))
}

export function deleteFriend (token, newUser) {
  return API
    .delete('my-friends/',
      {
        headers: {
          Authorization: `Token ${token}`
        },
        data: {
          username: newUser
        }
      })
    .then(res => (res.data))
}
