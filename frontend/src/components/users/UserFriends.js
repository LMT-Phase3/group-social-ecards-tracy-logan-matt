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
    <>
      <div className='create-card-header flex-col'>{pathUsername}'s Friends
        {user.friends && (
          <>
            {allUsers.map(other => (
              <>
                {(user.friends.includes(other.username)) && (
                  <ListGroup other={other.value} key={other.key} className='my-list-group flex'>

                    <ListGroupItem>
                      <Link className='card-title' to={`/user/${other.username}`}>
                        <div style={{ color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div className='user-card-profile' style={{ borderRadius: '80px', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: `url(${other.avatar})` }} />
                          <div>{other.username}</div>
                        </div>
                      </Link>
                    </ListGroupItem>
                  </ListGroup>

                )}
              </>
            ))}
          </>
        )}

      </div>
    </>
  )
}

export default UserFriends
