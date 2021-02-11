import Navbar from 'react-bootstrap/Navbar'
import { deleteCard, getCards } from '../../api'
import { Link, Redirect } from 'react-router-dom'

const CardNav = ({ token, username, card, pk, setIsUpdating, myProfile, setMyProfile, myFavorites, setMyFavorites, handleFollow, handleUnFollow, handleFavorite, handleUnFavorite }) => {
  function handleDelete (pk) {
    deleteCard(token, pk)
      .then(getCards(token))
  }
  function handleUpdate () {
    setIsUpdating(true)
  }

  if (!token) {
    return <Redirect to='/' />
  }

  return (
    <div>
      {myProfile && (
        <Navbar className='card-detail-navbar'>
          {(username !== card.user) && (
            <>
              <Navbar.Text style={{ color: 'white' }}>
                <Link to={`/user/${card.user}`}>
                  <span className='follow-link'>{card.user}</span>
                </Link>
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white' }}>
                {(card.user !== username && myProfile.friends.includes(card.user))
                  ? <span onClick={() => handleUnFollow(card.user)} className='follow-link'>Following<span className='material-icons'>thumb_up</span></span>
                  : <span onClick={() => handleFollow(card.user)} className='follow-link'>Follow<span className='material-icons'>thumb_up_off_alt</span></span>}
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white' }}>
                {myFavorites && (
                  <>
                    {(myFavorites.favorites.includes(card.title))
                      ? <span onClick={() => handleUnFavorite(card.title)} style={{ color: 'red' }} className='material-icons sm-nav-icon'>favorite</span>
                      : <span onClick={() => handleFavorite(card.title)} style={{ color: 'red' }} className='material-icons sm-nav-icon'>favorite_border</span>}
                  </>
                )}
              </Navbar.Text>
            </>
          )}
          {(username === card.user) && (
            <>
              <Navbar.Text style={{ color: 'white' }}>
                {/* Make these buttons */}
                <span onClick={() => handleUpdate()}>Edit</span><span className='material-icons sm-nav-icon'>edit</span>
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white' }}>
                <Link style={{ color: 'white' }} to='/cards' onClick={() => handleDelete(pk)}>
                  <span>Delete</span><span className='material-icons sm-van-icon'>delete</span>
                </Link>
              </Navbar.Text>
            </>
          )}
        </Navbar>
      )}
    </div>
  )
}

export default CardNav
