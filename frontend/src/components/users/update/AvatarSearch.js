
import { Redirect } from 'react-router-dom'
import { getSampleAvatars } from '../../../avatarApi'
import { useState } from 'react'

const AvatarSearch = ({ token, setAvatarImage }) => {
  const [Avatars, setAvatars] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pageNumber, setPageNumber] = useState(0)

  function getAvatars (keyword, page) {
    getSampleAvatars(keyword, page)
      .then(avatars => setAvatars(avatars))
  }

  function pageForward (keyword, page) {
    setPageNumber(page + 1)
    getAvatars(keyword, page + 1)
  }
  function pageBack (keyword, page) {
    setPageNumber(page - 1)
    getAvatars(keyword, page - 1)
  }

  function startAvatarSearch (keyword) {
    setPageNumber(1)
    getAvatars(keyword, 1)
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <div className='create-card-section'>
      <div className='create-card-header'>Search for Avatars</div>
      <label className='avatar-label' htmlFor='avatar'>Search Term</label>
      <input type='text' id='avatar' required value={searchTerm} onClick={evt => setSearchTerm('')} onChange={evt => setSearchTerm(evt.target.value)} />
      <button type='submit' className='button-style' onClick={() => startAvatarSearch(searchTerm)}>Get Avatars</button>
      <div className='flex'>
        {Avatars.map(avatar => (
          <div className='avatar-thumbnail' onClick={() => setAvatarImage(avatar)} avatar={avatar} key={avatar} style={{ backgroundImage: `url(${avatar})` }} />
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

export default AvatarSearch
