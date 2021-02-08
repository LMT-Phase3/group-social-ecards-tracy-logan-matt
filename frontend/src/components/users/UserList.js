import { Redirect, Link } from 'react-router-dom'
import { getUsers } from '../../api'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { useEffect, useState } from 'react'

const UserList = ({ token, username, userFilter }) => {
  const [users, setUsers] = useState([])
  useEffect(updateUsers, [token, username])
  // could write a condition within update cards to make a request to getMyCards
  // or getFriendsCards

  function updateUsers () {
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
              <div style={{ color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className='user-card-profile' style={{ borderRadius: '80px', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: `url(${user.avatar})` }} />
                <div>{user.username}</div>
              </div>
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  )
}

export default UserList
