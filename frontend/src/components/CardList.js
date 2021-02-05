import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Card from 'react-bootstrap/Card'
import { getCards } from '../api'
import { useState, useEffect } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

// import { Redirect } from 'react-router-dom'
import { Link, Redirect } from 'react-router-dom'
const CardList = ({ token }) => {
  const [cards, setCards] = useState([])
  const [showAll, setShowAll] = useState(true)
  // const [pk, setPk] = useState('')
  // const [key, setKey] = useState('')
  useEffect(updateCards, [token])
  function updateCards () {
    getCards(token).then(cards => setCards(cards))
  }

  if (!token) {
    return <Redirect to='/login' />
  }
  function handleToggle () {
    setShowAll(!showAll)
  }

  return (
    <>{token &&
      (<>{showAll
        ? (
          <ListGroup className='my-list-group'>
            <ListGroupItem>
              <div style={{ justifyContent: 'space-between' }} className='flex'><span>New Card</span></div>

              <Link onClick={() => handleToggle()} className='card-title' to='/cards'>
                <div style={{ backgroundColor: '#5ebaba85', justifyContent: 'center', alignItems: 'center' }} className='list-view-image flex'><span style={{ fontSize: '50px' }} className='material-icons'>add_circle_outline</span></div>
              </Link>
              <div className='flex'><span /></div>
            </ListGroupItem>
            {cards.map((card, idx) => (
              <ListGroupItem card={card} key={card.url}>

                <div style={{ justifyContent: 'space-between' }} className='flex'><span>{card.title}</span><span className='material-icons sm-nav-icon'>favorite_border</span></div>

                <Link className='card-title' to={`/card/${card.pk}`}>
                  <div className='list-view-image' style={{ backgroundImage: `url(${card.image_front}`, backgroundSize: 'cover' }} />
                </Link>
                <div className='flex'><span>{card.user}</span><span className='material-icons sm-nav-icon'>thumb_up_off_alt</span></div>
              </ListGroupItem>
            ))}
          </ListGroup>)
        : (<div className='flex'>
          <div className='flex-col'>
            <div className='flex-col card-detail-all'>
              <div style={{ paddingLeft: '20px', fontSize: '30px' }}>Select Card Features</div>
              <div style={{ paddingLeft: '25px', paddingRight: '25px', justifyContent: 'space-between' }} className='flex-col'>
                <div style={{ paddingLeft: '25px', paddingRight: '25px', justifyContent: 'space-between' }} className='flex'>

                  <DropdownButton
                    className='levels'
                    alignRight
                    title='Select Font'
                    id='dropdown-basic'
                    onSelect={() => {}}
                  >
                    <Dropdown.Item eventKey='Font 1'>Font 1</Dropdown.Item>
                    <Dropdown.Item eventKey='Font 2'>Font 2</Dropdown.Item>
                    <Dropdown.Item eventKey='Font 3'>Font 3</Dropdown.Item>
                    <Dropdown.Item eventKey='Font 4'>Font 4</Dropdown.Item>
                  </DropdownButton>
                  <div>Select Border</div>
                  <div>Select Background Color</div>
                  <div>Select Justification</div>
                </div>

                <div style={{ paddingLeft: '25px', paddingRight: '25px' }} className='flex'>

                  <div style={{ width: '300px', height: '200px', border: '2px solid black' }}>Input Title</div>
                  <div style={{ width: '300px', height: '200px', border: '2px solid black' }}>Input Message</div>
                </div>
                <div style={{ paddingLeft: '25px', paddingRight: '25px' }}>Search for Picture</div>

              </div>
            </div>

          </div>
          <div className='flex-col'>
            <div className='flex-col card-detail-all'>
              <div style={{ paddingLeft: '20px', fontSize: '30px' }}>Your Card</div>
              <Card>
                <Card.Body>
                  <div>
                    <div className='card-detail-holder myimage myfont-big' style={{ color: 'white', border: '2px solid black' }}><span className='my-card-title'>Title</span></div>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <div className='flex' style={{ border: '2px solid black', width: '600px', borderRadius: '10px' }}>
                  <Card.Body><div className='inside-body' style={{ border: '20px solid black', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}><span style={{ fontFamily: 'cursive' }}>Your Message</span></div></Card.Body>
                </div>
              </Card>
            </div>
            <Link style={{ marginTop: '15px', padding: '5px', borderRadius: '8px', fontSize: '23px', color: 'white', backgroundColor: 'teal', border: '2px solid black' }} to='/cards' onClick={() => handleToggle()}>Submit</Link>
          </div>
           </div>
          )}
      </>
      )}
    </>

  )
}

export default CardList
