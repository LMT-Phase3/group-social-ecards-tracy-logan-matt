import { getCardDetail } from '../api'
import { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import Navbar from 'react-bootstrap/Navbar'

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
          {/* <div className='flex-col' style={{ alignItems: 'center', marginTop: '50px', border: '2px black solid' }}>

            <Accordion style={{ width: '1100px' }} className='flex' defaultActiveKey='0'>
              <Card>
                <Card.Body>
                  <Accordion.Toggle as={Card.Body} eventKey='1'>
                    <div style={{ border: '10px solid yellowgreen', color: 'white' }} className='myimage myfont-big'>{card.title}</div>
                  </Accordion.Toggle>
                </Card.Body>
              </Card>
              <Card>
                <Accordion.Collapse className='animate__animated animate__fadeInLeft' eventKey='1'>
                  <Card.Body><div style={{ justifyContent: 'center', backgroundColor: '#12125f', border: '10px solid yellowgreen' }} className='flex mybackground '><span className='myfont-small'>{card.message}</span></div></Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Navbar style={{ backgroundColor: 'yellowgreen', justifyContent: 'space-between', width: '1100px' }}>
              <Navbar.Brand><Link to='/cards'>Return to Cards List</Link></Navbar.Brand>
              <Navbar.Text>
                Favorite
              </Navbar.Text>
              <Navbar.Text>
                Edit card
              </Navbar.Text>
              <Navbar.Text>
                Delete card
              </Navbar.Text>
            </Navbar>
          </div> */}
          <div className='flex-col' style={{ alignItems: 'center', marginTop: '50px' }}>
            <Carousel>
              <Carousel.Item>
                <div style={{ border: `10px solid ${card.background}`, color: 'white', backgroundImage: `url(${card.image_front}` }} className='myimage myfont-big'>{card.title}</div>
              </Carousel.Item>
              <Carousel.Item>
                <div style={{ border: `10px solid ${card.background}`, paddingLeft: '70px', paddingRight: '70px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#12125f' }} className='flex mybackground '><span className='myfont-small'>{card.message}</span></div>
              </Carousel.Item>
            </Carousel>
            <Navbar style={{ backgroundImage: 'none', justifyContent: 'space-between', width: '750px', backgroundColor: 'black', color: 'white' }}>
              <Navbar.Brand style={{ color: 'white' }}><Link to='/cards'>Return to Cards List</Link></Navbar.Brand>
              <Navbar.Text style={{ color: 'white' }}>
                Favorite
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white' }}>
                Edit card
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white' }}>
                Delete card
              </Navbar.Text>
            </Navbar>
          </div>
        </>
      )}
    </>

  )
}

export default CardDetail
