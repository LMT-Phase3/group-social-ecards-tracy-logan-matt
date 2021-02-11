import Navbar from 'react-bootstrap/Navbar'
import { Redirect } from 'react-router-dom'

const UserNav = ({ token, user, username, pathUsername, profileUsername, setIsUpdatingProfile }) => {
  function handleUpdate () {
    setIsUpdatingProfile(true)
  }
  if (!token) {
    return <Redirect to='/' />
  }
  if (profileUsername === undefined) {
    pathUsername = username
  }

  return (
    <Navbar className='card-detail-navbar'>
      {(username === pathUsername) && (
        <Navbar.Text style={{ color: 'white' }}>
          <span onClick={() => handleUpdate()}>Edit Profile</span><span className='material-icons sm-nav-icon'>edit</span>
        </Navbar.Text>
      )}
    </Navbar>
  )
}

export default UserNav
