import { getCardDetail } from '../api'
// import 'font-awesome/css/font-awesome.min.css'
import { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
// import Carousel from 'react-bootstrap/Carousel'
import Navbar from 'react-bootstrap/Navbar'

const CardDetail = ({ token, pk, setViewDetail, viewDetail, cards }) => {
  const [card, setCard] = useState([])
  useEffect(() => {
    getCardDetail(token, pk).then(card => setCard(card))
  }, [token, pk])

  if (!token) {
    return <Redirect to='/login' />
  }
  function getNextCard (id) {
    setCard(cards[id])
  }
  function getPreviousCard (id) {
    setCard(cards[id - 1])
  }

  function hideDetail () {
    if (viewDetail) {
      setViewDetail(false)
    }
  }
  return (
    <>
      {card && (
        <>
          <div className='flex-col' style={{ alignItems: 'center', marginTop: '30px' }}>
            <Link className='ml-sm-4' style={{ fontSize: '20px' }} onClick={() => hideDetail()} to='/cards'>Return to Cards List</Link>

            <Accordion style={{ width: '700px' }} className='flex' defaultActiveKey='0'>
              <Card>
                <Card.Body>
                  <Accordion.Toggle as={Card.Body} eventKey='1'>
                    <div style={{ border: `20px solid ${card.background}`, color: 'white', backgroundImage: `url(${card.image_front}` }} className='myimage myfont-big'>{card.title}</div>
                  </Accordion.Toggle>
                </Card.Body>
              </Card>
              <Card>
                <Accordion.Collapse className='animate__animated animate__fadeInLeft' eventKey='1'>
                  <Card.Body><div style={{ border: `20px solid ${card.background}`, paddingLeft: '70px', paddingRight: '70px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#12125f' }} className='flex mybackground '><span style={{ fontFamily: `${card.font}` }} className='myfont-small'>{card.message}</span></div></Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Navbar bg='dark' variant='dark' style={{ backgroundImage: 'none', justifyContent: 'space-between', width: '700px' }}>
              <Navbar.Text style={{ color: 'white', fontSize: '18px' }}>
                Favorite
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white', fontSize: '18px' }}>
                Edit card
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white', fontSize: '18px' }}>
                Delete card
              </Navbar.Text>
              <Navbar.Text onClick={() => getPreviousCard(pk)} style={{ color: 'white', fontSize: '18px' }}>
                Previous card
              </Navbar.Text>
              <Navbar.Text onClick={() => getNextCard(pk)} style={{ color: 'white', fontSize: '18px' }}>
                Next card
              </Navbar.Text>
            </Navbar>
          </div>

          {/* <div className='flex-col' style={{ alignItems: 'center', marginTop: '40px' }}>
            <Link className='ml-sm-4' style={{ fontSize: '20px' }} onClick={() => hideDetail()} to='/cards'>Return to Cards List</Link>
            <Carousel>
              <Carousel.Item>
                <div style={{ border: `20px solid ${card.background}`, color: 'white', backgroundImage: `url(${card.image_front}` }} className='myimage myfont-big'>{card.title}</div>
              </Carousel.Item>
              <Carousel.Item>
                <div style={{ border: `20px solid ${card.background}`, paddingLeft: '70px', paddingRight: '70px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#12125f' }} className='flex mybackground '><span style={{ fontFamily: `${card.font}` }} className='myfont-small'>{card.message}</span></div>
              </Carousel.Item>
            </Carousel>
            <Navbar style={{ backgroundImage: 'none', justifyContent: 'space-between', width: '750px', backgroundColor: 'black', color: 'white' }}>
              <Navbar.Text style={{ color: 'white', fontSize: '20px' }}>
                Favorite
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white', fontSize: '20px' }}>
                Edit card
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white', fontSize: '20px' }}>
                Delete card
              </Navbar.Text>
              <Navbar.Text onClick={() => getPreviousCard(pk)} style={{ color: 'white', fontSize: '20px' }}>
                Previous card
              </Navbar.Text>
              <Navbar.Text onClick={() => getNextCard(pk)} style={{ color: 'white', fontSize: '20px' }}>
                Next card
              </Navbar.Text>
            </Navbar>
          </div> */}
        </>
      )}
    </>

  )
}

export default CardDetail
