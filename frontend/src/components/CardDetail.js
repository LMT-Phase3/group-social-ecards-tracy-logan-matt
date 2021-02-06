import { getCardDetail } from '../api'
import { useState, useEffect } from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'
import CardNav from './CardNav'
import CardContent from './CardContent'
import UpdateCard from './UpdateCard'

const CardDetail = ({ token, username }) => {
  const { pk } = useParams()
  const [card, setCard] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(updateCard, [token, pk])
  function updateCard () {
    getCardDetail(token, pk).then(card => setCard(card))
  }

  // useEffect(() => {
  //   getCardDetail(token, pk).then(card => setCard(card))
  // }, [token, pk])

  if (!token) {
    return <Redirect to='/' />
  }

  return (
    <>
      {card &&
      (<>{(!isUpdating)
        ? (
          <div className='flex-col card-detail-all'>
            <div className='flex card-detail-header'>
              <Link className='general-link' to='/cards'>Return to Cards List</Link>
            </div>
            <CardNav token={token} username={username} setIsUpdating={setIsUpdating} card={card} pk={pk} />
            <CardContent backgroundColor={card.background} border={card.border} font={card.font} backgroundImage={card.image_front} title={card.title} message={card.message} />
          </div>)
        : (
          <UpdateCard
            token={token} pk={pk} isUpdating={isUpdating} setIsUpdating={setIsUpdating} card={card} handleDone={(updatedCard) => {
              setIsUpdating(false)
              setCard(updatedCard)
            }}
          />

          )}
       </>)}
    </>

  )
}

export default CardDetail
