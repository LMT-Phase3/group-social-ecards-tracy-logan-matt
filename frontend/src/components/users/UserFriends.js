import { Link, Redirect } from 'react-router-dom'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'

const UserFriends = ({ token, user, profileUsername }) => {
  // function handleUpdate () {
  //   setIsUpdatingProfile(true)
  // }
  if (!token) {
    return <Redirect to='/' />
  }
  console.log(user.friends[0])

  return (
    <>
      <div className='create-card-header flex-col'>{profileUsername}'s Friends
        {user.friends && (
          <ListGroup className='my-list-group flex'>
            {user.friends.map(friend => (
              <ListGroupItem friend={friend} key={friend}>
                <Link className='card-title' to={`/user/${friend}`}>
                  <div style={{ color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <div className='user-card-profile' style={{ borderRadius: '80px', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: `url(${friend.avatar})` }} /> */}
                    <div>{friend}</div>
                  </div>
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>

        )}
        <Link className='create-bar-header' style={{ width: '100%' }} to={`/users/${profileUsername}/cards`}>{profileUsername}'s Cards</Link>

      </div>
    </>
  )
}

export default UserFriends
