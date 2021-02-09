import { getCardDetail } from '../../api'
import { useState, useEffect } from 'react'
import { Redirect, useParams, useHistory } from 'react-router-dom'
import CardNav from './CardNav'
import CardContent from './CardContent'
import UpdateCard from './UpdateCard'

const CardDetail = ({ token, username, myCards, setMyCards }) => {
  const { pk } = useParams()
  const [card, setCard] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const history = useHistory()

  useEffect(updateCard, [token, pk])
  function updateCard () {
    getCardDetail(token, pk).then(card => setCard(card))
  }

  if (!token) {
    return <Redirect to='/' />
  }

  return (
    <>
      {card &&
      (<>{(!isUpdating)
        ? (
          <div className='flex-col card-detail-all'>
            <div className='flex-col card-detail-header'>
              <button className='general-link' onClick={() => history.goBack()}>Return to Cards List</button>
              <CardNav token={token} username={username} setIsUpdating={setIsUpdating} card={card} pk={pk} myCards={myCards} setMyCards={setMyCards} />
            </div>
            <CardContent
              backgroundColor={card.background} border={card.border} font={card.font} backgroundImage={card.image_front} title={card.title} message={card.message}
              fontColor={card.font_color} borderType={card.border_type}
            />
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
