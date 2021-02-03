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
        <div className='ml-sm-4 mr-sm-4 card-container'>

          <div className='myfont-big'>{card.title}</div>
          <div className='flex'>
            <div style={{ border: '10px solid yellowgreen' }} className='myimage' />
            <div style={{ justifyContent: 'center', backgroundColor: '#12125f', border: '10px solid yellowgreen' }} className='flex mybackground animate__animated animate__fadeInRight'><span className='myfont-small'>{card.message}</span></div>
          </div>
          {/* <div>User: {card.user}</div> */}

        </div>
      )}
    </>

  )
}

export default CardDetail
