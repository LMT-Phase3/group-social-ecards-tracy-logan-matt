import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import CreateCard from './CreateCard'
import { getCards, getMyCards } from '../../api'
import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

const CardList = ({ token, username, cardFilter, isCreating, setIsCreating, setCardFilter, handleCardsFilter }) => {
  const [cards, setCards] = useState([])
  console.log(cardFilter)

  // const [isCreating, setIsCreating] = useState(false)

  useEffect(updateCards, [token, username, cardFilter])
  // could write a condition within update cards to make a request to getMyCards
  // or getFriendsCards

  function updateCards () {
    if (cardFilter === 'my') {
      getMyCards(token, username).then(cards => setCards(cards))
      // remove username once backend is set up
    } else if (cardFilter === 'friends') {
      getCards(token).then(cards => setCards(cards))
      // getFriendsCards(token, username).then(cards => setCards(cards))
      // remove username once backend is set up
    } else {
      getCards(token).then(cards => setCards(cards))
    }
    getCards(token).then(cards => setCards(cards))
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>{token && cards &&
      (<>{(!isCreating)
        ? (<>
          <>
            {(cardFilter === 'all') && (
              <div className='general-link card-detail-header card-detail-all'>All Cards</div>
            )}
          </>
          <>
            {(cardFilter === 'my') && (
              <div className='general-link card-detail-header card-detail-all'>My Cards</div>
            )}
          </>
          <>
            {(cardFilter === 'friends') && (
              <div className='general-link card-detail-header card-detail-all'>Friends Cards</div>
            )}
          </>
          <ListGroup className='my-list-group'>
            <ListGroupItem key='1'>
              <div style={{ justifyContent: 'space-between' }} className='flex'><span>New Card</span></div>
              <div onClick={() => setIsCreating(true)} style={{ margin: '0 0 12px' }} className='card-title'>
                <div style={{ backgroundColor: '#5ebaba85', justifyContent: 'center', alignItems: 'center' }} className='list-view-image flex'><span style={{ fontSize: '50px' }} className='material-icons'>add_circle_outline</span></div>
              </div>
              <div className='flex'><span /></div>
            </ListGroupItem>
            {cards.map(card => (
              <ListGroupItem card={card} key={card.url}>

                <div style={{ justifyContent: 'space-between' }} className='flex'><span>{card.title}</span><span className='material-icons sm-nav-icon'>favorite_border</span></div>

                <Link className='card-title' to={`/card/${card.pk}`}>
                  <div className='list-view-image' style={{ backgroundImage: `url(${card.image_front}`, backgroundSize: 'cover' }} />
                </Link>
                {/* <Link to={`/users-detail/${card.user.pk}`}> */}
                <Link to={`/user/${card.user}`}>
                  <div className='flex'>
                    <span>{card.user}</span>
                    <span className='material-icons sm-nav-icon'>thumb_up_off_alt</span>
                  </div>

                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </>)
        : (<CreateCard
            token={token} setIsCreating={setIsCreating} setCardFilter={setCardFilter} handleDone={(newCard) => {
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
