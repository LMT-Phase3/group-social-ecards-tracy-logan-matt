import Navbar from 'react-bootstrap/Navbar'
import { deleteCard, getCards } from '../api'
import { Redirect } from 'react-router-dom'

const CardNav = ({ token, card, pk, setIsUpdating }) => {
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
  }

  return (
    <Navbar className='card-detail-navbar'>
      <Navbar.Text style={{ color: 'white' }}>
        <span className='material-icons sm-nav-icon'>favorite_border</span>
      </Navbar.Text>
      <Navbar.Text style={{ color: 'white' }}>
        <span onClick={() => handleUpdate()} className='material-icons sm-nav-icon'>edit</span>
      </Navbar.Text>
      <Navbar.Text style={{ color: 'white' }}>
        <span onClick={() => handleDelete(pk)} className='material-icons sm-nav-icon'>delete</span>
      </Navbar.Text>
      <Navbar.Text style={{ color: 'white' }}>
        <span className='material-icons sm-nav-icon'>arrow_back</span>
      </Navbar.Text>
      <Navbar.Text style={{ color: 'white' }}>
        <span className='material-icons sm-nav-icon'>arrow_forward</span>
      </Navbar.Text>
    </Navbar>
  )
}

export default CardNav
