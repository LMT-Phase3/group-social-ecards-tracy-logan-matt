import Navbar from 'react-bootstrap/Navbar'
import { Redirect } from 'react-router-dom'

const UserNav = ({ token, user, username, profileUsername, setIsUpdatingProfile }) => {
  function handleUpdate () {
    setIsUpdatingProfile(true)
  }
  if (!token) {
    return <Redirect to='/' />
  }

  return (
    <Navbar className='card-detail-navbar'>
      <>
        {(username === profileUsername) && (
          <Navbar.Text style={{ color: 'white' }}>
            <span onClick={() => handleUpdate()}>Edit Profile</span><span className='material-icons sm-nav-icon'>edit</span>
          </Navbar.Text>
        )}
      </>
    </Navbar>
  )
}

export default UserNav
