import { getCardDetail } from '../api'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const CardDetail = ({ token, pk }) => {
  const [card, setCard] = useState([])
  useEffect(() => {
    getCardDetail(token, pk).then(card => setCard(card))
  }, [token, pk])

  if (!token) {
    return <Redirect to='/login' />
  }
  return (
    <>
      {card && (
        <div className='ml-sm-4 mr-sm-4'>

          <div>Title: {card.title}</div>
          <div>User: {card.user}</div>
          <div>Message: {card.message}</div>

        </div>
      )}
    </>

  )
}

export default CardDetail
