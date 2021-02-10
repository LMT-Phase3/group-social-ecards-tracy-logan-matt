import axios from 'axios'

export function getSampleAvatars (searchTerm, pageNumber) {
  const API_PHOTOS = axios.create({
    baseURL: `https://api.unsplash.com/search/photos?&page=${pageNumber}&client_id=Z9V0WhGfK0DRkcWKTH9mUFSsNdrXfiWemw0M-PrLb4s&query=${searchTerm}`
  })

  return API_PHOTOS
    .get()
    .then(res => res.data)
    .then(data => {
      const avatars = []
      for (const avatar of data.results) {
        avatars.push(avatar.urls.regular)
      }
      return avatars
    }
    )
}
