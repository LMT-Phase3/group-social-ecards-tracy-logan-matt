import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { getCards } from '../api'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const CardList = ({ token }) => {
  const [cards, setCards] = useState([])
  useEffect(() => {
    getCards(token).then(cards => setCards(cards))
  }, [token])

  if (!token) {
    return <Redirect to='/login' />
  }
  return (
    <ListGroup className='ml-sm-4 mr-sm-4'>
      {cards.map((card, idx) => (
        <ListGroupItem card={card} key={idx}>
          <div>Title: {card.title}</div>
          <div>User: {card.user}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

export default CardList
