import Navbar from 'react-bootstrap/Navbar'
import { deleteCard, getCards } from '../api'
import { Link, Redirect } from 'react-router-dom'

const CardNav = ({ token, username, card, pk, setIsUpdating }) => {
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
    <Navbar className='card-detail-navbar'>
      {(username !== card.user) && (
        <>
          <Navbar.Text style={{ color: 'white' }}>
            <span className='follow-link'>{card.user}<span className='material-icons'>thumb_up_off_alt</span></span>
          </Navbar.Text>
          <Navbar.Text style={{ color: 'white' }}>
            <span className='material-icons sm-nav-icon'>favorite_border</span>
          </Navbar.Text>
        </>
      )}
      {(username === card.user) && (
        <>
          <Navbar.Text style={{ color: 'white' }}>
            {/* <Link to={`/cards/${pk}/`}> */}
            <span onClick={() => handleUpdate()}>Edit</span><span className='material-icons sm-nav-icon'>edit</span>
            {/* </Link> */}
          </Navbar.Text>
          <Navbar.Text style={{ color: 'white' }}>
            <Link style={{ color: 'white' }} to='/cards' onClick={() => handleDelete(pk)}>
              <span>Delete</span><span className='material-icons sm-van-icon'>delete</span>
            </Link>
            {/* <span onClick={() => handleDelete(pk)} className='material-icons sm-nav-icon'>delete</span> */}
          </Navbar.Text>
        </>
      )}
    </Navbar>
  )
}

export default CardNav
