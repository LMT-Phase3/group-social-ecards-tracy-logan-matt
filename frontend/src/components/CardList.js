import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import CreateCard from './CreateCard'
import { getCards } from '../api'
import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

const CardList = ({ token }) => {
  const [cards, setCards] = useState([])
  const [isCreating, setIsCreating] = useState(false)

  useEffect(updateCards, [token])

  function updateCards () {
    getCards(token).then(cards => setCards(cards))
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>{token &&
      (<>{(!isCreating)
        ? (
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
                <div className='flex'><span>{card.user}</span><span className='material-icons sm-nav-icon'>thumb_up_off_alt</span></div>
              </ListGroupItem>
            ))}
          </ListGroup>)
        : (<CreateCard
            token={token} handleDone={(newCard) => {
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
