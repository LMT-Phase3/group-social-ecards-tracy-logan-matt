
import { Redirect } from 'react-router-dom'
import { getSamplePhotos } from '../photoApi'
import { useState } from 'react'

const PhotoSearch = ({ token }) => {
  const [photos, setPhotos] = useState([])
  const [displayPhoto, setDisplayPhoto] = useState('')
  function getPhotos () {
    getSamplePhotos()
      .then(photos => setPhotos(photos))
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>
      <button onClick={() => getPhotos()}>Get Photos</button>
      <div style={{ backgroundImage: `url(${displayPhoto})`, width: '300px', height: '200px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
      {/* <div className='flex' style={{ flexWrap: 'wrap' }}> */}
      <div className='flex' style={{ flexWrap: 'wrap' }}>
        {photos.map(photo => (

          <div onClick={() => setDisplayPhoto(photo)} photo={photo} key={photo} style={{ backgroundImage: `url(${photo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height: '200px', width: '300px' }} />
        ))}
      </div>
    </>
  )
}

export default PhotoSearch
