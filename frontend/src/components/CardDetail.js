import { getCardDetail } from '../api'
import { useState, useEffect } from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'

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
        <>
          <div className='flex-col card-detail-all'>
            <div style={{ justifyContent: 'space-between', width: '600px' }} className='flex'><Link className='general-link' to='/cards'>Return to Cards List</Link><span className='general-link'>Follow {card.user}<span className='material-icons'>thumb_up_off_alt</span></span></div>

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
              <Navbar.Text style={{ color: 'white' }}>
                <span className='material-icons sm-nav-icon'>arrow_back</span>
              </Navbar.Text>
              <Navbar.Text style={{ color: 'white' }}>
                <span className='material-icons sm-nav-icon'>arrow_forward</span>
              </Navbar.Text>
            </Navbar>
            <Accordion defaultActiveKey='0'>
              <Card>
                <Card.Body>
                  <Accordion.Toggle as={Card.Body} eventKey='1'>
                    <div className='card-detail-holder myimage myfont-big' style={{ color: 'white', backgroundImage: `url(${card.image_front}` }}><span className='my-card-title'>{card.title}</span></div>
                  </Accordion.Toggle>
                </Card.Body>
              </Card>
              <Card>
                <Accordion.Collapse className='flex animate__animated animate__fadeInLeft' eventKey='1'>
                  <Card.Body><div className='inside-body' style={{ border: `20px solid ${card.border}`, justifyContent: 'center', alignItems: 'center', backgroundColor: `${card.background}` }}><span style={{ fontFamily: `${card.font}` }}>{card.message}</span></div></Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

          </div>
        </>
      )}
    </>

  )
}

export default CardDetail
