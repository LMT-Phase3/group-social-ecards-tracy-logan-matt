
import { Redirect } from 'react-router-dom'
import { getSamplePhotos } from '../../../photoApi'
import { useState } from 'react'

const PhotoSearch = ({ token, setBackgroundImage }) => {
  const [photos, setPhotos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pageNumber, setPageNumber] = useState(0)

  function getPhotos (keyword, page) {
    getSamplePhotos(keyword, page)
      .then(photos => setPhotos(photos))
  }

  function pageForward (keyword, page) {
    setPageNumber(page + 1)
    console.log(pageNumber)
    console.log(page)
    getPhotos(keyword, page + 1)
  }
  function pageBack (keyword, page) {
    setPageNumber(page - 1)
    console.log(pageNumber)
    console.log(page)
    getPhotos(keyword, page - 1)
  }

  function startPhotoSearch (keyword) {
    setPageNumber(1)
    console.log(pageNumber)
    getPhotos(keyword, 1)
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <div className='create-card-section'>
      <div className='create-card-header'>Search for Photos</div>
      <label className='photo-label' htmlFor='photo'>Search Term</label>
      <input type='text' id='photo' required value={searchTerm} onClick={evt => setSearchTerm('')} onChange={evt => setSearchTerm(evt.target.value)} />
      <button type='submit' className='button-style' onClick={() => startPhotoSearch(searchTerm)}>Get Photos</button>
      <div className='flex'>
        {photos.map(photo => (
          <div className='photo-thumbnail' onClick={() => setBackgroundImage(photo)} photo={photo} key={photo} style={{ backgroundImage: `url(${photo})` }} />
        ))}
        <div className='flex-col' style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div className='flex'>
            {(pageNumber === 1) && (
              <button className='button-style' onClick={() => pageForward(searchTerm, pageNumber)}><span>Next</span></button>

            )}
            {(pageNumber > 1) && (
              <>
                <button className='button-style' onClick={() => pageBack(searchTerm, pageNumber)}><span>Previous</span></button>
                <button className='button-style' onClick={() => pageForward(searchTerm, pageNumber)}><span>Next</span></button>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default PhotoSearch
