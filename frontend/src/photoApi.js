import axios from 'axios'

const API_PHOTOS = axios.create({
  baseURL: 'https://api.unsplash.com/photos/?client_id=Z9V0WhGfK0DRkcWKTH9mUFSsNdrXfiWemw0M-PrLb4s'
})

export function getSamplePhotos () {
  return API_PHOTOS
    .get()
    .then(res => res.data)
    .then(data => {
      const photos = []
      // console.log(data)
      for (const photo of data) {
        if (photo.width > photo.height) {
          photos.push(photo.urls.regular)
        }
        // console.log(photo.urls.regular)
      }
      return photos
      // console.log(photos)
    }

    )
}
