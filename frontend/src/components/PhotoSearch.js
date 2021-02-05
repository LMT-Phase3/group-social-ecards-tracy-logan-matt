
import { Link, Redirect } from 'react-router-dom'
import { getSamplePhotos } from '../photoApi'
import { useEffect } from 'react'

const PhotoSearch = ({ token }) => {
  useEffect(() => {
    getSamplePhotos()
  }, [])

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>
      <div>Hello World</div>
      <Link to='/'>Back Home</Link>
    </>
  )
}

export default PhotoSearch
