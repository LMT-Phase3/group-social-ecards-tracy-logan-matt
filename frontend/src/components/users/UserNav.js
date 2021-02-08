import Navbar from 'react-bootstrap/Navbar'
import { Redirect } from 'react-router-dom'

const UserNav = ({ token, user, profileUsername, setIsUpdatingProfile }) => {
  function handleUpdate () {
    setIsUpdatingProfile(true)
  }
  if (!token) {
    return <Redirect to='/' />
  }

  return (
    <Navbar className='card-detail-navbar'>
      <>
        <Navbar.Text style={{ color: 'white' }}>
          {/* <Link to={`/cards/${pk}/`}> */}
          <span onClick={() => handleUpdate()}>Edit</span><span className='material-icons sm-nav-icon'>edit</span>
          {/* </Link> */}
        </Navbar.Text>
      </>
    </Navbar>
  )
}

export default UserNav
