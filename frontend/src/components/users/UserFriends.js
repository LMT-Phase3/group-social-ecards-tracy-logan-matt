import { Link, Redirect } from 'react-router-dom'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'

const UserFriends = ({ token, user, profileUsername, allUsers, setAllUsers, pathUsername }) => {
  // function handleUpdate () {
  //   setIsUpdatingProfile(true)
  // }

  if (!token) {
    return <Redirect to='/' />
  }

  return (
    <div className='flex'>
      {(user.friends.length > 0) && pathUsername && (
        <div className='flex'>
          <div className='profile-header'>{pathUsername}'s Friends
            <div className='flex'>
              {allUsers.map(other => (
                <div key={other.pk}>
                  {(user.friends.includes(other.username)) && (
                    <ListGroup className='my-list-group flex'>

                      <ListGroupItem className='friend-card'>
                        <Link className='card-title' to={`/user/${other.username}`}>
                          <div style={{ color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='friend-user-profile' style={{ borderRadius: '80px', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: `url(${other.avatar})` }} />
                            <div>{other.username}</div>
                          </div>
                        </Link>
                      </ListGroupItem>
                    </ListGroup>

                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>

  )
}

export default UserFriends
