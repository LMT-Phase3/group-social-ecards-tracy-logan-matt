import { getCardDetail } from '../api'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
// import Accordion from 'react-bootstrap/Accordion'
// import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

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
        <>
          {/* <div className='myfont-big'>{card.title}</div>

          <Accordion className='flex' defaultActiveKey='0'>
            <Card>
              <Card.Body>
                <Accordion.Toggle as={Card.Body} eventKey='1'>
                  <div style={{ border: '10px solid yellowgreen' }} className='myimage' />
                </Accordion.Toggle>
              </Card.Body>
            </Card>
            <Card>

              <Accordion.Collapse className='animate__animated animate__flipInY' eventKey='1'>
                <Card.Body><div style={{ justifyContent: 'center', backgroundColor: '#12125f', border: '10px solid yellowgreen' }} className='flex mybackground '><span className='myfont-small'>{card.message}</span></div></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion> */}

          <Carousel>
            <Carousel.Item>
              <div style={{ border: '10px solid yellowgreen' }} className='myimage' />
            </Carousel.Item>
            <Carousel.Item>
              <div style={{ paddingLeft: '70px', paddingRight: '70px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#12125f', border: '10px solid yellowgreen' }} className='flex mybackground '><span className='myfont-small'>{card.message}</span></div>
            </Carousel.Item>

          </Carousel>
        </>
      )}
    </>

  )
}

export default CardDetail
