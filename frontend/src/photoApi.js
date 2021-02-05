import axios from 'axios'

const API_PHOTOS = axios.create({
  baseURL: 'https://api.unsplash.com/photos/?client_id=Z9V0WhGfK0DRkcWKTH9mUFSsNdrXfiWemw0M-PrLb4s'
})

export function getSamplePhotos () {
  return API_PHOTOS
    .get()
    .then(res => console.log(res.data))
}
