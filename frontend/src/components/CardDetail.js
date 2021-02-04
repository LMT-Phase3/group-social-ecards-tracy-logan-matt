import { getCardDetail } from '../api'
// import 'font-awesome/css/font-awesome.min.css'
import { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'

const CardDetail = ({ idx, token, pk, setViewDetail, viewDetail, cards }) => {
  const [card, setCard] = useState([])
  useEffect(() => {
    getCardDetail(token, pk).then(card => setCard(card))
  }, [token, pk])

  if (!token) {
    return <Redirect to='/login' />
  }
  function getNextCard (id) {
    console.log(id)
    console.log(cards[id])
    setCard(cards[id + 1])
  }
  function getPreviousCard (id) {
    console.log(id)
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
          <div className='flex-col card-detail-all'>
            <Link className='ml-sm-4 general-link' onClick={() => hideDetail()} to='/cards'>Return to Cards List</Link>

            <Accordion className='card-detail-holder flex' defaultActiveKey='0'>
              <Card>
                <Card.Body>
                  <Accordion.Toggle as={Card.Body} eventKey='1'>
                    <div style={{ border: `20px solid ${card.border}`, color: 'white', backgroundImage: `url(${card.image_front}` }} className='myimage myfont-big'>{card.title}{idx}</div>
                  </Accordion.Toggle>
                </Card.Body>
              </Card>
              <Card>
                <Accordion.Collapse className='animate__animated animate__fadeInLeft' eventKey='1'>
                  <Card.Body><div className='inside-body flex' style={{ border: `20px solid ${card.border}`, justifyContent: 'center', alignItems: 'center', backgroundColor: `${card.background}` }}><span style={{ fontFamily: `${card.font}` }} className='myfont-small'>{card.message}</span></div></Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Navbar className='card-detail-navbar'>
              <Navbar.Text style={{ color: 'white' }}>
                <span className='material-icons sm-nav-icon'>favorite_border</span>
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white' }}>
                <span className='material-icons sm-nav-icon'>edit</span>
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white' }}>
                <span className='material-icons sm-nav-icon'>delete</span>
              </Navbar.Text>
              <Navbar.Text onClick={() => getPreviousCard(idx)} style={{ color: 'white' }}>
                <span className='material-icons sm-nav-icon'>arrow_back</span>
              </Navbar.Text>
              <Navbar.Text onClick={() => getNextCard(idx)} style={{ color: 'white' }}>
                <span className='material-icons sm-nav-icon'>arrow_forward</span>
              </Navbar.Text>
            </Navbar>
          </div>
        </>
      )}
    </>

  )
}

export default CardDetail
