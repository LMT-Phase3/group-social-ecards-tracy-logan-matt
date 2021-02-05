import Card from 'react-bootstrap/Card'
// import { getCards } from '../api'
// import { useState, useEffect } from 'react'
import { useState } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Redirect } from 'react-router-dom'

const CreateCard = ({ token, handleDone }) => {
  const [backgroundColor, setBackgroundColor] = useState('pink')
  const [font, setFont] = useState("Rubik', sans-serif")

  if (!token) {
    return <Redirect to='/login' />
  }

  function handleSubmit () {
    // event.preventDefault()
    handleDone()
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
              <div>Select Border</div>
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
              <div>Select Justification</div>
            </div>

            <div style={{ marginTop: '25px', paddingLeft: '25px', paddingRight: '25px' }} className='flex'>

              <div style={{ width: '300px', height: '200px', border: '2px solid black' }}>Input Title</div>
              <div style={{ width: '450px', height: '200px', border: '2px solid black' }}>Input Message</div>
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
              <Card.Body><div className='inside-body' style={{ border: '20px solid black', justifyContent: 'center', alignItems: 'center', backgroundColor: `${backgroundColor}` }}><span style={{ fontFamily: `${font}` }}>Your Message</span></div></Card.Body>
            </div>
          </Card>
        </div>
        <button style={{ marginTop: '15px', padding: '5px', borderRadius: '8px', fontSize: '23px', color: 'white', backgroundColor: 'teal', border: '2px solid black' }} onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  )
}

export default CreateCard
