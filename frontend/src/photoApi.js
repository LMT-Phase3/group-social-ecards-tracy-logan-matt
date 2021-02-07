import axios from 'axios'

// const API_PHOTOS = axios.create({
//   // baseURL: 'https://api.unsplash.com/photos/?client_id=Z9V0WhGfK0DRkcWKTH9mUFSsNdrXfiWemw0M-PrLb4s'
//   // baseURL: 'https://api.unsplash.com/search/photos?page=1&query=thanksgiving&client_id=Z9V0WhGfK0DRkcWKTH9mUFSsNdrXfiWemw0M-PrLb4s'
//   baseURL: 'https://api.unsplash.com/search/photos?page=1&client_id=Z9V0WhGfK0DRkcWKTH9mUFSsNdrXfiWemw0M-PrLb4s&query=love'
// })

export function getSamplePhotos (searchTerm, pageNumber) {
  const API_PHOTOS = axios.create({
    // baseURL: 'https://api.unsplash.com/photos/?client_id=Z9V0WhGfK0DRkcWKTH9mUFSsNdrXfiWemw0M-PrLb4s'
    // baseURL: 'https://api.unsplash.com/search/photos?page=1&query=thanksgiving&client_id=Z9V0WhGfK0DRkcWKTH9mUFSsNdrXfiWemw0M-PrLb4s'
    baseURL: `https://api.unsplash.com/search/photos?&page=${pageNumber}&orientation=landscape&client_id=Z9V0WhGfK0DRkcWKTH9mUFSsNdrXfiWemw0M-PrLb4s&query=${searchTerm}`
  })
  console.log(pageNumber)
  console.log(API_PHOTOS)

  return API_PHOTOS
    .get()
    .then(res => res.data)
    .then(data => {
      const photos = []
      // console.log(data)
      for (const photo of data.results) {
        // if (photo.width > photo.height) {
        photos.push(photo.urls.regular)
        // }
        // console.log(photo.urls.regular)
      }
      return photos
      // console.log(photos)
    }

    )
}
