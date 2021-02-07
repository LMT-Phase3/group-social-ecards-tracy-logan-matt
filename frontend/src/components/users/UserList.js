import { Redirect } from 'react-router-dom'
import { getCards } from '../../api'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { useEffect, useState } from 'react'

const UserList = ({ token, username, userFilter }) => {
  const [cards, setCards] = useState([])
  useEffect(updateCards, [token, username])
  // could write a condition within update cards to make a request to getMyCards
  // or getFriendsCards

  function updateCards () {
    getCards(token).then(cards => setCards(cards))
  }
  if (!token) {
    return <Redirect to='/login' />
  }
  const users = []
  for (const card of cards) {
    if (users.includes(card.user)) {
      console.log(card.user)
    } else {
      users.push(card.user)
      console.log(users)
    }
  }

  return (
    <>
      <>
        {(userFilter === 'all') && (
          <div className='general-link card-detail-header card-detail-all'>All Users</div>
        )}
      </>
      <>
        {(userFilter === 'me') && (
          <div className='general-link card-detail-header card-detail-all'>My Profile</div>
        )}
      </>
      <>
        {(userFilter === 'friends') && (
          <div className='general-link card-detail-header card-detail-all'>Friends' Profiles</div>
        )}
      </>
      <ListGroup className='my-list-group'>
        {users.map(user => (
          <ListGroupItem user={user} key={user.id}>
            <div className='flex'><span>{user} </span><span className='material-icons sm-nav-icon'>thumb_up_off_alt</span></div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  )
}

export default UserList
