import { Redirect, Link } from 'react-router-dom'
import { getUsers } from '../../api'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { useEffect, useState } from 'react'

const UserList = ({ token, username, userFilter }) => {
  const [users, setUsers] = useState([])
  useEffect(updateCards, [token, username])
  // could write a condition within update cards to make a request to getMyCards
  // or getFriendsCards

  function updateCards () {
    getUsers(token).then(users => setUsers(users))
  }

  // console.log(users[0].friends)
  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>
      <>
        {(userFilter === 'all') && (
          <div className='general-link card-detail-header card-detail-all'>All Users</div>
        )}
      </>
      <>
        {(userFilter === 'friends') && (
          <div className='general-link card-detail-header card-detail-all'>Friends' Profiles</div>
        )}
      </>
      <ListGroup className='my-list-group'>
        {users.map(user => (
          <ListGroupItem user={user} key={user.pk}>
            {/* <Link className='card-title' to={`/user/${user.pk}`}> */}
            <Link className='card-title' to={`/user/${user.username}`}>

              <div className='flex'><span>{user.username} </span><span className='material-icons sm-nav-icon'>thumb_up_off_alt</span></div>
            </Link>
            {user.friends && (
              <>
                {user.friends.map(friend => (
                  <ListGroupItem friend={friend} key={friend.pk}>
                    <div>{friend}</div>
                  </ListGroupItem>

                ))}
              </>
            )}

          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  )
}

export default UserList
