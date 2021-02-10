import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import CreateCard from './CreateCard'
import { addFriend, deleteFriend, getCards } from '../../api'
import { useState, useEffect } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'

const UserCardList = ({ token, username, isCreating, setIsCreating, myProfile, setMyProfile, pathUsername }) => {
  const [cards, setCards] = useState([])
  const { profileUsername } = useParams()
  if (profileUsername === undefined) {
    pathUsername = username
  } else { pathUsername = profileUsername }
  const apiPath = `/users/${pathUsername}/cards`
  useEffect(updateCards, [token, username, apiPath])

  function updateCards () {
    getCards(token, apiPath).then(cards => setCards(cards))
  }

  function handleFollow (newuser) {
    addFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
  }

  function handleUnFollow (newuser) {
    deleteFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>{token && cards && myProfile &&
      (<>{(!isCreating)
        ? (

          <div className='create-bar-header create-card-header'>{pathUsername}'s Cards

            <ListGroup className='flex my-list-group'>

              {cards.map(card => (
                <ListGroupItem card={card} key={card.pk}>
                  <div style={{ justifyContent: 'space-between' }} className='flex'><span>{card.title}</span><span className='material-icons sm-nav-icon'>favorite_border</span></div>
                  <Link className='card-title' to={`/card/${card.pk}`}>
                    <div className='list-view-image' style={{ backgroundImage: `url(${card.image_front}`, backgroundSize: 'cover' }} />
                  </Link>
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
            </ListGroup>
          </div>
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

export default UserCardList
