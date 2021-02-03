import { getCards } from '../api'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const CardDetail = ({ token, id }) => {
  const [cards, setCards] = useState([])
  useEffect(() => {
    getCards(token).then(cards => setCards(cards))
  }, [token])

  const card = cards[0]

  if (!token) {
    return <Redirect to='/login' />
  }
  return (
    <div className='ml-sm-4 mr-sm-4'>

      <div>Title: {card.title}</div>
      <div>User: {card.user}</div>
      <div>Message: {card.message}</div>

    </div>
  )
}

export default CardDetail
