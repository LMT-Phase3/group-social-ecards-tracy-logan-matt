import Card from 'react-bootstrap/Card'
// import { getCards } from '../api'
// import { useState, useEffect } from 'react'
import { useState } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Redirect } from 'react-router-dom'
import { createCard } from '../api'
import { getSamplePhotos } from '../photoApi'

const CreateCard = ({ token, handleDone }) => {
  const [backgroundColor, setBackgroundColor] = useState('pink')
  const [border, setBorder] = useState('black')
  const [font, setFont] = useState("Rubik', sans-serif")
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2700&q=80')
  const [title, setTitle] = useState('Your Title')
  const [message, setMessage] = useState('Your Message')
  const [photos, setPhotos] = useState([])
  // const [displayPhoto, setDisplayPhoto] = useState('')

  if (!token) {
    return <Redirect to='/login' />
  }
  function getPhotos () {
    getSamplePhotos()
      .then(photos => setPhotos(photos))
  }

  function handleSubmit (event) {
    event.preventDefault()
    createCard(token, backgroundColor, font, border, backgroundImage, title, message)
      .then(card => {
        handleDone(card)
      })
  }

  return (
    <>
      <div>
        <div className='flex'>

          <form onSubmit={(event) => handleSubmit(event)}>
            <div className='flex-col' style={{ flexBasis: '1000px' }}>
              <div style={{ border: 'solid 2px black', borderRadius: '8px' }} className='flex-col card-detail-all'>

                <div style={{ paddingLeft: '20px', fontSize: '30px' }}>Select Card Features</div>
                {/* <div style={{ paddingLeft: '25px', paddingRight: '25px', justifyContent: 'space-between' }} className='flex-col'> */}
                <div className='flex-col'>
                  <div style={{ marginTop: '25px', paddingLeft: '25px', paddingRight: '25px' }} className='flex'>
                    <label className='title-label' htmlFor='title'>Title</label>
                    <input type='text' id='title' required value={title} onClick={evt => setTitle('')} onChange={evt => setTitle(evt.target.value)} />
                    <label className='message-label' htmlFor='message'>Message</label>
                    <input type='textarea' id='message' required value={message} onClick={evt => setMessage('')} onChange={evt => setMessage(evt.target.value)} />
                  </div>
                  <div style={{ paddingLeft: '25px', paddingRight: '25px', marginTop: '30px', justifyContent: 'space-between' }} className='flex'>

                    <DropdownButton
                      className='levels'
                      alignRight
                      title='Select Font'
                      id='dropdown-basic'
                      onSelect={(e) => setFont(e)}
                    >
                      <Dropdown.Item style={{ fontFamily: "'Rubik', sans-serif" }} eventKey="'Rubik', sans-serif">Rubik</Dropdown.Item>
                      <Dropdown.Item style={{ fontFamily: 'cursive' }} eventKey='cursive'>Cursive</Dropdown.Item>
                      <Dropdown.Item style={{ fontFamily: 'Lucinda' }} eventKey='Lucinda'>Lucinda</Dropdown.Item>
                      <Dropdown.Item style={{ fontFamily: 'monospace' }} eventKey='monospace'>Monospace</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                      className='levels'
                      alignRight
                      title='Select Border'
                      id='dropdown-basic'
                      onSelect={(e) => setBorder(e)}
                    >
                      <Dropdown.Item style={{ border: 'solid 5px black' }} eventKey='black'>Black</Dropdown.Item>
                      <Dropdown.Item style={{ border: 'solid 5px yellow' }} eventKey='yellow'>Yellow</Dropdown.Item>
                      <Dropdown.Item style={{ border: 'solid 5px blue' }} eventKey='blue'>Blue</Dropdown.Item>
                      <Dropdown.Item style={{ border: 'solid 5px green' }} eventKey='green'>Green</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                      className='levels'
                      alignRight
                      title='Select Background Color'
                      id='dropdown-basic'
                      onSelect={(e) => setBackgroundColor(e)}
                    >
                      <Dropdown.Item style={{ backgroundColor: 'pink' }} eventKey='pink'>Pink</Dropdown.Item>
                      <Dropdown.Item style={{ backgroundColor: 'yellow' }} eventKey='yellow'>Yellow</Dropdown.Item>
                      <Dropdown.Item style={{ backgroundColor: 'blue' }} eventKey='blue'>Blue</Dropdown.Item>
                      <Dropdown.Item style={{ backgroundColor: 'green' }} eventKey='green'>Green</Dropdown.Item>
                    </DropdownButton>
                    {/* <div>Select Justification</div> */}
                    {/* Add justification later once gets put into models on the backend */}
                    <button type='submit' style={{ marginLeft: '50px', marginTop: '30px' }} className='button-style'>Submit Card</button>

                  </div>
                </div>

              </div>

            </div>
          </form>
        </div>
        <div style={{ marginLeft: '50px', marginRight: '50px', marginTop: '25px' }}>
          <button className='button-style' onClick={() => getPhotos()}>Get Photos</button>
          <div className='flex' style={{ flexWrap: 'wrap', flexBasis: '1000px' }}>
            {photos.map(photo => (
              <div onClick={() => setBackgroundImage(photo)} photo={photo} key={photo} style={{ border: '2px solid black', borderRadius: '6px', marginRight: '5px', marginLeft: '5px', backgroundImage: `url(${photo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height: '167px', width: '250px' }} />
            ))}
          </div>
        </div>

        <div className='flex-col'>
          <div style={{ paddingLeft: '20px', fontSize: '30px', marginLeft: '50px' }}>Your Card</div>

          <div className='flex card-detail-all'>
            <Card>
              <Card.Body>
                <div>
                  <div className='card-detail-holder myimage myfont-big' style={{ color: 'white', border: '2px solid black', backgroundImage: `url(${backgroundImage})` }}><span className='my-card-title'>{title}</span></div>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <div className='flex' style={{ border: '2px solid black', width: '600px', borderRadius: '10px' }}>
                <Card.Body><div className='inside-body' style={{ border: `20px solid ${border}`, justifyContent: 'center', alignItems: 'center', backgroundColor: `${backgroundColor}` }}><span style={{ fontFamily: `${font}` }}>{message}</span></div></Card.Body>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </>
  )
}

export default CreateCard
