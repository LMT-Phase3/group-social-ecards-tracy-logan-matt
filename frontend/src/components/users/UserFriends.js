import { Redirect } from 'react-router-dom'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'

const UserFriends = ({ token, user, profileUsername }) => {
  // function handleUpdate () {
  //   setIsUpdatingProfile(true)
  // }
  if (!token) {
    return <Redirect to='/' />
  }

  return (
    <>
      <div className='create-card-header'>{profileUsername}'s Friends</div>
      <ListGroup>
        {user.friends && (
          <>
            {user.friends.map(friend => (
              <ListGroupItem friend={friend} key={friend.pk}>
                <div>{friend}</div>
              </ListGroupItem>

            ))}
          </>
        )}
      </ListGroup>

    </>
  )
}

export default UserFriends
