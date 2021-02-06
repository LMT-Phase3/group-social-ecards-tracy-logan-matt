
import { Redirect } from 'react-router-dom'
import { getSamplePhotos } from '../photoApi'
import { useState } from 'react'

const PhotoSearch = ({ token, setBackgroundImage }) => {
  const [photos, setPhotos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  function getPhotos (keyword) {
    getSamplePhotos(keyword)
      .then(photos => setPhotos(photos))
  }

  // useEffect(setImage, '')

  // function setImage (photo) {
  //   handleBackground(photo)
  // }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <div className='create-card-section'>
      <div className='create-card-header'>Search for Photos</div>
      <label className='photo-label' htmlFor='photo'>Search Term</label>
      <input type='text' id='photo' required value={searchTerm} onClick={evt => setSearchTerm('')} onChange={evt => setSearchTerm(evt.target.value)} />
      <button type='submit' className='button-style' onClick={() => getPhotos(searchTerm)}>Get Photos</button>
      <div className='flex'>
        {photos.map(photo => (
          <div className='photo-thumbnail' onClick={() => setBackgroundImage(photo)} photo={photo} key={photo} setBackgroundImage={setBackgroundImage} style={{ backgroundImage: `url(${photo})` }} />
        ))}
      </div>
    </div>
  )
}

export default PhotoSearch
