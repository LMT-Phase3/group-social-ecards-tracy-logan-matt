import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import CreateCard from './CreateCard'
import { getCards } from '../../api'
import { useState, useEffect } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'

const UserCardList = ({ token, username, isCreating, setIsCreating, myProfile, setMyProfile, pathUsername, setMyFavorites, myFavorites, handleFollow, handleUnFollow, handleFavorite, handleUnFavorite }) => {
  const [cards, setCards] = useState([])
  const { profileUsername } = useParams()
  const [pagination, setPagination] = useState(1)

  if (profileUsername === undefined) {
    pathUsername = username
  } else { pathUsername = profileUsername }
  const apiPath = `/users/${pathUsername}/cards`
  useEffect(updateCards, [token, username, apiPath, pagination])

  function updateCards () {
    getCards(token, apiPath, pagination).then(cards => setCards(cards))
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
        ? (
          <div className='create-bar-header create-card-header'>{pathUsername}'s Cards
            <ListGroup className='flex my-list-group'>
              {cards.map(card => (
                <ListGroupItem card={card} key={card.pk}>
                  <div style={{ justifyContent: 'space-between' }} className='flex'>
                    <span>{card.title}</span>
                    {myFavorites && (
                      <>
                        {(myFavorites.favorites.includes(card.title))
                          ? <span onClick={() => handleUnFavorite(card.title)} style={{ color: 'red' }} className='material-icons sm-nav-icon'>favorite</span>
                          : <span onClick={() => handleFavorite(card.title)} style={{ color: 'red' }} className='material-icons sm-nav-icon'>favorite_border</span>}
                      </>
                    )}
                  </div>
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
                      </>)}
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
