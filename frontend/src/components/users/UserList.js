import { Redirect, Link } from 'react-router-dom'
import { addFriend, deleteFriend, getUsers } from '../../api'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { useEffect, useState } from 'react'

const UserList = ({ token, username, userFilter, myProfile, setMyProfile }) => {
  const [users, setUsers] = useState([])

  useEffect(updateUsers, [token, username])
  function updateUsers () {
    getUsers(token).then(users => setUsers(users))
  }

  function handleFollow (newuser) {
    addFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
  }

  function handleUnFollow (newuser) {
    deleteFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
  }

  console.log({ users })
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
            <div className='card-title'>
              <div style={{ color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Link to={`/user/${user.username}`}>
                  <div className='user-card-profile' style={{ borderRadius: '80px', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: `url(${user.avatar})` }} />
                </Link>
                <div className='flex'>
                  <span>{user.username}</span>
                  {(user.username !== username) && (
                    <>
                      {((myProfile && myProfile.friends.includes(user.username)))
                        ? <span onClick={() => handleUnFollow(user.username)} style={{ color: 'grey' }} className='material-icons sm-nav-icon'>thumb_up</span>

                        : <span onClick={() => handleFollow(user.username)} className='material-icons sm-nav-icon'>thumb_up_off_alt</span>}
                    </>
                  )}
                </div>
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  )
}

export default UserList
