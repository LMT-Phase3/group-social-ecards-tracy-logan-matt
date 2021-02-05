import Card from 'react-bootstrap/Card'
// import { getCards } from '../api'
// import { useState, useEffect } from 'react'
import { useState } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Redirect } from 'react-router-dom'
import { createCard } from '../api'

const CreateCard = ({ token, handleDone }) => {
  const [backgroundColor, setBackgroundColor] = useState('pink')
  const [border, setBorder] = useState('black')
  const [font, setFont] = useState("Rubik', sans-serif")
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2700&q=80')

  if (!token) {
    return <Redirect to='/login' />
  }

  function handleSubmit (event) {
    event.preventDefault()
    createCard(token, backgroundColor, font, border, backgroundImage)
      .then(card => {
        handleDone(card)
      })
  }

  return (
    <div className='flex'>
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
                onSelect={(e) => setFont(e)}
              >
                <Dropdown.Item eventKey="'Rubik', sans-serif">Rubik</Dropdown.Item>
                <Dropdown.Item eventKey='cursive'>Cursive</Dropdown.Item>
                <Dropdown.Item eventKey='Lucinda'>Lucinda</Dropdown.Item>
                <Dropdown.Item eventKey='monospace'>Monospace</Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                className='levels'
                alignRight
                title='Select Border'
                id='dropdown-basic'
                onSelect={(e) => setBorder(e)}
              >
                <Dropdown.Item eventKey='black'>Black</Dropdown.Item>
                <Dropdown.Item eventKey='yellow'>Yellow</Dropdown.Item>
                <Dropdown.Item eventKey='blue'>Blue</Dropdown.Item>
                <Dropdown.Item eventKey='green'>Green</Dropdown.Item>
              </DropdownButton>
              <DropdownButton
                className='levels'
                alignRight
                title='Select Background Color'
                id='dropdown-basic'
                onSelect={(e) => setBackgroundColor(e)}
              >
                <Dropdown.Item eventKey='pink'>Pink</Dropdown.Item>
                <Dropdown.Item eventKey='yellow'>Yellow</Dropdown.Item>
                <Dropdown.Item eventKey='blue'>Blue</Dropdown.Item>
                <Dropdown.Item eventKey='green'>Green</Dropdown.Item>
              </DropdownButton>
              {/* <div>Select Justification</div> */}
              {/* Add justification later once gets put into models on the backend */}
            </div>

            <div style={{ marginTop: '25px', paddingLeft: '25px', paddingRight: '25px' }} className='flex'>

              <div style={{ width: '300px', height: '200px', border: '2px solid black' }}>Input Title</div>
              <div style={{ width: '450px', height: '200px', border: '2px solid black' }}>Input Message</div>
            </div>
            <div style={{ paddingLeft: '25px', paddingRight: '25px' }}>Search for Picture<button onClick={() => setBackgroundImage('')}>Clear Photo</button></div>

          </div>
        </div>

      </div>
      <div className='flex-col'>
        <div className='flex-col card-detail-all'>
          <div style={{ paddingLeft: '20px', fontSize: '30px' }}>Your Card</div>
          <Card>
            <Card.Body>
              <div>
                <div className='card-detail-holder myimage myfont-big' style={{ color: 'white', border: '2px solid black', backgroundImage: `url(${backgroundImage})` }}><span className='my-card-title'>Title</span></div>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <div className='flex' style={{ border: '2px solid black', width: '600px', borderRadius: '10px' }}>
              <Card.Body><div className='inside-body' style={{ border: `20px solid ${border}`, justifyContent: 'center', alignItems: 'center', backgroundColor: `${backgroundColor}` }}><span style={{ fontFamily: `${font}` }}>Your Message</span></div></Card.Body>
            </div>
          </Card>
        </div>
        <button style={{ marginTop: '15px', padding: '5px', borderRadius: '8px', fontSize: '23px', color: 'white', backgroundColor: 'teal', border: '2px solid black' }} onClick={(event) => handleSubmit(event)}>Submit</button>
      </div>
    </div>
  )
}

export default CreateCard
