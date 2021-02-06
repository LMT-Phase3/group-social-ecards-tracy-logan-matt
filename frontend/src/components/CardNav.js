import Navbar from 'react-bootstrap/Navbar'

const CardNav = () => {
  return (
    <Navbar className='card-detail-navbar'>
      <Navbar.Text style={{ color: 'white' }}>
        <span className='material-icons sm-nav-icon'>favorite_border</span>
      </Navbar.Text>
      <Navbar.Text style={{ color: 'white' }}>
        <span className='material-icons sm-nav-icon'>edit</span>
      </Navbar.Text>
      <Navbar.Text style={{ color: 'white' }}>
        <span className='material-icons sm-nav-icon'>delete</span>
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
