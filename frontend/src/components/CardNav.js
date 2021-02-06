import Navbar from 'react-bootstrap/Navbar'
import { deleteCard, getCards } from '../api'
import { Redirect } from 'react-router-dom'

const CardNav = ({ token, username, card, pk, setIsUpdating }) => {
  if (!token) {
    return <Redirect to='/' />
  }

  function handleDelete (pk) {
    deleteCard(token, pk)
      .then(getCards(token))
    return <Redirect to='/cards' />
  }
  function handleUpdate () {
    setIsUpdating(true)
    return <Redirect to='/cards' />
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
          <Navbar.Text style={{ color: 'white' }}><span>Edit</span>
            <span onClick={() => handleUpdate()} className='material-icons sm-nav-icon'>edit</span>
          </Navbar.Text>
          <Navbar.Text style={{ color: 'white' }}><span>Delete</span>
            <span onClick={() => handleDelete(pk)} className='material-icons sm-nav-icon'>delete</span>
          </Navbar.Text>
        </>

      )}
      {/* <Navbar.Text style={{ color: 'white' }}>
        <span className='material-icons sm-nav-icon'>arrow_back</span>
      </Navbar.Text>
      <Navbar.Text style={{ color: 'white' }}>
        <span className='material-icons sm-nav-icon'>arrow_forward</span>
      </Navbar.Text> */}
    </Navbar>
  )
}

export default CardNav
