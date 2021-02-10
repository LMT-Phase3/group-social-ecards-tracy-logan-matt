import axios from 'axios'

export function getSamplePhotos (searchTerm, pageNumber) {
  const API_PHOTOS = axios.create({
    baseURL: `https://api.unsplash.com/search/photos?&page=${pageNumber}&orientation=landscape&client_id=Z9V0WhGfK0DRkcWKTH9mUFSsNdrXfiWemw0M-PrLb4s&query=${searchTerm}`
  })

  return API_PHOTOS
    .get()
    .then(res => res.data)
    .then(data => {
      const photos = []
      for (const photo of data.results) {
        photos.push(photo.urls.regular)
      }
      return photos
    }
    )
}
