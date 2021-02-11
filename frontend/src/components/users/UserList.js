import { Redirect, Link } from 'react-router-dom'
import { addFriend, deleteFriend, getUsers } from '../../api'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { useEffect, useState } from 'react'

const UserList = ({ token, username, userFilter, userApiPath, myProfile, setMyProfile }) => {
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState(1)

  useEffect(updateUsers, [token, username, userApiPath, pagination])
  function updateUsers () {
    getUsers(token, userApiPath, pagination).then(users => setUsers(users))
  }

  function handleFollow (newuser) {
    addFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
  }

  function handleUnFollow (newuser) {
    deleteFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
  }
  function handleForward (pageNumber) {
    if (!stopForward) {
      setPagination(pagination + 1)
    }
  }
  function handleBackward (pageNumber) {
    if (!stopBackward) {
      setPagination(pagination - 1)
    }
  }
  let stopForward = false
  if (users.length < 10) {
    stopForward = true
  }
  let stopBackward = true
  if (pagination > 1) {
    stopBackward = false
  }

  let navigate = true
  if (pagination === 1 && users.length < 10) {
    navigate = false
  }

  if (!token) {
    return <Redirect to='/login' />
  }
  if (userFilter === undefined) {
    userFilter = 'all'
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
        {navigate && (
          <ListGroupItem key='a'>
            <div className='card-title'>
              <div style={{ color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className='user-card-profile' style={{ borderRadius: '80px', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: '#00000030' }}><span style={{ marginTop: '40px', color: 'black', fontSize: '50px', paddingRight: '40px', width: '50px' }} onClick={() => handleBackward(pagination)} className='material-icons'>arrow_backward</span><span style={{ color: 'black', fontSize: '50px', paddingLeft: '40px' }} onClick={() => handleForward(pagination)} className='material-icons'>arrow_forward</span></div>
              </div>
              <div className='flex'>
                <span>View More Users</span>
              </div>
            </div>
          </ListGroupItem>
        )}
      </ListGroup>
    </>
  )
}

export default UserList
