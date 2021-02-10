import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import CreateCard from './CreateCard'
import { getCards, addFriend, deleteFriend } from '../../api'
// import { getCards } from '../../api'

import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

const CardList = ({ token, username, isCreating, setIsCreating, apiPath, myProfile, setMyProfile }) => {
  const [cards, setCards] = useState([])
  const [pagination, setPagination] = useState(1)

  useEffect(updateCards, [token, username, apiPath, pagination])
  // useEffect(handleFollow, [])

  function updateCards () {
    getCards(token, apiPath, pagination).then(cards => setCards(cards))
  }

  function handleUnFollow (newuser) {
    deleteFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
    getCards(token, apiPath).then(cards => setCards(cards))
  }
  function handleFollow (newuser) {
    addFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
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
  if (cards.length < 10) {
    stopForward = true
  }
  let stopBackward = true
  if (pagination > 1) {
    stopBackward = false
  }

  let navigate = true
  if (pagination === 1 && cards.length < 10) {
    navigate = false
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>{token && cards && myProfile &&
      (<>{(!isCreating)
        ? (<>
          <>
            {(apiPath === 'cards') && (
              <div className='general-link card-detail-header card-detail-all'>All Cards</div>
            )}
          </>
          <>
            {(apiPath === 'user-cards') && (
              <div className='general-link card-detail-header card-detail-all'>My Cards</div>
            )}
          </>
          <>
            {(apiPath === 'friends-cards') && (
              <div className='general-link card-detail-header card-detail-all'>Friends Cards</div>
            )}
          </>
          <ListGroup className='my-list-group'>
            <ListGroupItem key='a'>
              <div style={{ justifyContent: 'space-between' }} className='flex'><span>New Card</span></div>
              <div onClick={() => setIsCreating(true)} style={{ margin: '0 0 12px' }} className='card-title'>
                <div style={{ backgroundColor: '#5ebaba85', justifyContent: 'center', alignItems: 'center' }} className='list-view-image flex'><span style={{ fontSize: '50px' }} className='material-icons'>add_circle_outline</span></div>
              </div>
              <div className='flex'><span /></div>
            </ListGroupItem>
            {cards.map(card => (
              <ListGroupItem card={card} key={card.pk}>
                <div style={{ justifyContent: 'space-between' }} className='flex'><span>{card.title}</span><span className='material-icons sm-nav-icon'>favorite_border</span></div>
                <Link className='card-title' to={`/card/${card.pk}`}>
                  <div className='list-view-image' style={{ backgroundImage: `url(${card.image_front}`, backgroundSize: 'cover' }} />
                </Link>
                {/* <Link to={`/users-detail/${card.user.pk}`}> */}
                <div className='flex'>
                  <Link to={`/user/${card.user}`}>
                    <span>{card.user}</span>
                  </Link>
                  {(card.user !== username) && (
                    <>
                      {(myProfile.friends.includes(card.user))
                        ? <span onClick={() => handleUnFollow(card.user)} style={{ color: 'grey' }} className='material-icons sm-nav-icon'>thumb_up</span>
                        : <span onClick={() => handleFollow(card.user)} className='material-icons sm-nav-icon'>thumb_up_off_alt</span>}
                    </>
                  )}
                </div>
              </ListGroupItem>
            ))}
            {navigate && (
              <ListGroupItem key='b'>
                <div style={{ justifyContent: 'space-between' }} className='flex'><span>View Cards</span></div>
                <div style={{ margin: '0 0 12px' }} className='card-title'>
                  <div style={{ display: 'flex', backgroundColor: '#5ebaba85', justifyContent: 'center', alignItems: 'center' }} className='list-view-image flex'><span style={{ fontSize: '50px', paddingRight: '40px', width: '50px' }} onClick={() => handleBackward(pagination)} className='material-icons'>arrow_backward</span><span style={{ fontSize: '50px', paddingLeft: '40px' }} onClick={() => handleForward(pagination)} className='material-icons'>arrow_forward</span></div>
                </div>
                <div className='flex'><span /></div>
              </ListGroupItem>
            )}

          </ListGroup>
           </>
          )
        : (<CreateCard
            token={token} setIsCreating={setIsCreating} handleDone={(newCard) => {
              setIsCreating(false)
              setCards([newCard, ...cards])
            }}
           />
          )}
       </>

      )}
    </>

  )
}

export default CardList
