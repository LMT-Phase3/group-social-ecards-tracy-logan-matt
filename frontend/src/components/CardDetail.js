import { getCardDetail } from '../api'
import { useState, useEffect } from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'
import CardNav from './CardNav'
import CardContent from './CardContent'

const CardDetail = ({ token }) => {
  const { pk } = useParams()
  const [card, setCard] = useState([])
  useEffect(() => {
    getCardDetail(token, pk).then(card => setCard(card))
  }, [token, pk])

  if (!token) {
    return <Redirect to='/' />
  }

  return (
    <>
      {card && (
        <div className='flex-col card-detail-all'>
          <div style={{ justifyContent: 'space-between', width: '600px' }} className='flex'><Link className='general-link' to='/cards'>Return to Cards List</Link><span className='general-link'>Follow {card.user}<span className='material-icons'>thumb_up_off_alt</span></span></div>
          <CardNav />
          <CardContent backgroundColor={card.background} border={card.border} font={card.font} backgroundImage={card.image_front} title={card.title} message={card.message} />
        </div>
      )}
    </>

  )
}

export default CardDetail
