import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { getCards } from '../api'
import { useState, useEffect } from 'react'

// import { Redirect } from 'react-router-dom'
import { Link, Redirect } from 'react-router-dom'
const CardList = ({ token }) => {
  const [cards, setCards] = useState([])
  // const [pk, setPk] = useState('')
  // const [key, setKey] = useState('')
  useEffect(updateCards, [token])
  function updateCards () {
    getCards(token).then(cards => setCards(cards))
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>{token &&
      (
        <ListGroup className='my-list-group'>
          {cards.map((card, idx) => (
            <ListGroupItem card={card} key={card.url}>

              <div style={{ justifyContent: 'space-between' }} className='flex'><span>{card.title}</span><span className='material-icons sm-nav-icon'>favorite_border</span></div>

              <Link className='card-title' to={`/card/${card.pk}`}>
                <div className='list-view-image' style={{ backgroundImage: `url(${card.image_front}`, backgroundSize: 'cover' }} />
              </Link>
              <div className='flex'><span>{card.user}</span><span className='material-icons sm-nav-icon'>thumb_up_off_alt</span></div>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </>

  )
}

export default CardList
