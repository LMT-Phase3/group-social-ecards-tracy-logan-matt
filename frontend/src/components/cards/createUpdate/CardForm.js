
import { Redirect } from 'react-router-dom'
import { createCard, updateCard } from '../../../api'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'

const CardForm = ({ token, pk, isUpdating, handleDone, setBackgroundColor, setBorder, setFont, setTitle, setMessage, setBackgroundImage, setFontColor, setBorderType, backgroundColor, font, border, backgroundImage, title, message, fontColor, borderType }) => {
  // const [fontColor, setFontColor] = useState('white')
  // const [borderType, setBorderType] = useState('solid')
  const [justification, setJustification] = useState('left')

  if (!token) {
    return <Redirect to='/' />
  }

  function handleSubmit (event) {
    event.preventDefault()
    console.log('at top of handle submit')
    console.log(isUpdating)
    if (!isUpdating) {
      createCard(token, backgroundColor, font, border, backgroundImage, title, message, fontColor, borderType)
        .then(card => {
          handleDone(card)
        })
    } else {
      console.log('I am here')
      updateCard(token, pk, backgroundColor, font, border, backgroundImage, title, message, fontColor, borderType)
        .then(card => {
          console.log(card)
          handleDone(card)
        })
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div style={{ border: 'solid 2px black', borderRadius: '8px' }} className='card-detail-all'>
        <div className='create-card-header'>Select Card Features</div>
        <div className='create-card-dropdown flex'>
          <DropdownButton
            className='levels'
            alignRight
            title='Select Font'
            id='font'
            onSelect={(e) => setFont(e)}
          >
            <Dropdown.Item style={{ fontFamily: "'Rubik', sans-serif" }} eventKey="'Rubik', sans-serif">Rubik</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: 'cursive' }} eventKey='cursive'>Cursive</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: 'Lucinda' }} eventKey='Lucinda'>Lucinda</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: 'monospace' }} eventKey='monospace'>Monospace</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: 'fantasy' }} eventKey='fantasy'>Fantasy</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Caveat', cursive" }} eventKey='caveat'>Caveat</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Anton', sans-serif" }} eventKey='anton'>Anton</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Pacifico', cursive" }} eventKey="'Pacifico', cursive">Pacifico</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Bungee Shade', cursive" }} eventKey="'Bungee Shade', cursive">Bungee Shade</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Creepster', cursive" }} eventKey="'Creepster', cursive">Creepster</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Lobster', cursive" }} eventKey="'Lobster', cursive">Lobster</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Dancing Script', cursive" }} eventKey="'Dancing Script', cursive">Dancing Script</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Indie Flower', cursive" }} eventKey="'Indie Flower', cursive">Indie Flower</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Parisienne', cursive" }} eventKey='parisienne'>Parisienne</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Bangers', cursive" }} eventKey='bangers'>Bangers</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Calligraffitti', cursive" }} eventKey='calligraffitti'>Calligraffitti</Dropdown.Item>
            <Dropdown.Item style={{ fontFamily: "'Sedgwick Ave Display', cursive" }} eventKey="'Sedgwick Ave Display', cursive">Sedgwick Ave Display</Dropdown.Item>

          </DropdownButton>
          <DropdownButton
            className='levels'
            alignRight
            title='Select Font Color'
            id='font-color'
            onSelect={(e) => setFontColor(e)}
          >
            <Dropdown.Item style={{ color: 'black' }} eventKey='black'>Black</Dropdown.Item>
            <Dropdown.Item style={{ color: 'white', backgroundColor: 'black' }} eventKey='white'>White</Dropdown.Item>
            <Dropdown.Item style={{ color: 'blue' }} eventKey='blue'>Blue</Dropdown.Item>
            <Dropdown.Item style={{ color: 'red' }} eventKey='red'>Red</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            className='levels'
            alignRight
            title='Select Border'
            id='border'
            onSelect={(e) => setBorder(e)}
          >
            <Dropdown.Item style={{ border: 'solid 5px black' }} eventKey='black'>Black</Dropdown.Item>
            <Dropdown.Item style={{ border: 'dotted 5px yellow' }} eventKey='yellow'>Yellow</Dropdown.Item>
            <Dropdown.Item style={{ border: 'solid 5px blue' }} eventKey='blue'>Blue</Dropdown.Item>
            <Dropdown.Item style={{ border: 'solid 5px green' }} eventKey='green'>Green</Dropdown.Item>
            <Dropdown.Item style={{ border: 'solid 5px red' }} eventKey='red'>Red</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            className='levels'
            alignRight
            title='Select Border Type'
            id='border-type'
            onSelect={(e) => setBorderType(e)}
          >
            <Dropdown.Item style={{ border: 'solid 8px black', fontWeight: 'bold' }} eventKey='solid 20px'>Solid Big</Dropdown.Item>
            <Dropdown.Item style={{ border: 'dotted 8px black', fontWeight: 'bold' }} eventKey='dotted 20px'>Dotted Big</Dropdown.Item>
            <Dropdown.Item style={{ border: 'solid 2px black' }} eventKey='solid 5px'>Solid Narrow</Dropdown.Item>
            <Dropdown.Item style={{ border: 'dotted 2px black' }} eventKey='dotted 5px'>Dotted Narrow</Dropdown.Item>
            <Dropdown.Item style={{ border: 'groove 8px black' }} eventKey='groove 5px'>Groove Narrow</Dropdown.Item>
            <Dropdown.Item style={{ border: 'ridge 8px black' }} eventKey='ridge 5px'>Ridge</Dropdown.Item>
            <Dropdown.Item style={{ border: 'double 8px black' }} eventKey='double 10px'>Double</Dropdown.Item>
            <Dropdown.Item style={{ border: 'outset 8px black' }} eventKey='outset 5px'>Outset</Dropdown.Item>
            <Dropdown.Item style={{ border: 'inset 8px black' }} eventKey='inset 5px'>Inset</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            className='levels'
            alignRight
            title='Select Background Color'
            id='background'
            onSelect={(e) => setBackgroundColor(e)}
          >
            <Dropdown.Item style={{ backgroundColor: '#37474fad', color: 'white' }} eventKey='#37474fad'>Gray</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: '#0e0f10', color: 'white' }} eventKey='#0e0f10'>Black</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: '#0a0a60db', color: 'white' }} eventKey='#0a0a60db'>Blue</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: '#0b6c32d9', color: 'white' }} eventKey='#0b6c32d9'>Green</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: '#f57c00ab', color: 'white' }} eventKey='#f57c00ab'>Orange</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: '#ffcd24', color: 'white' }} eventKey='#ffcd24'>Gold</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: '#2aabe4', color: 'white' }} eventKey='#2aebe4'>Light Blue</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: '#9dc8e4', color: 'white' }} eventKey='#9dc8e4'>Sky</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: '#666b6e', color: 'white' }} eventKey='#666b6e'>Gray</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: '#ffc2bb', color: 'white' }} eventKey='#ffc2bb'>Pink</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            className='levels'
            alignRight
            title='Select Justification'
            id='justification'
            onSelect={(e) => setJustification(e)}
          >
            <Dropdown.Item style={{ textAlign: 'left' }} eventKey='left'>Left</Dropdown.Item>
            <Dropdown.Item style={{ textAlign: 'center' }} eventKey='center'>Center</Dropdown.Item>
            <Dropdown.Item style={{ textAlign: 'right' }} eventKey='right'>Right</Dropdown.Item>
          </DropdownButton>
          {/* <div>Select Justification</div> */}
          {/* Add justification later once gets put into models on the backend */}
        </div>
        <button type='submit' className='button-style'>Submit Card</button>
      </div>
      <div className='card-detail-all'>
        <div className='create-card-section flex-col'>
          {/* <div className='create-card-header'>Your Card</div> */}
          <div className='flex'>
            <Card>
              <Card.Body>
                <div className='card-detail-holder myimage myfont-big' style={{ color: `${fontColor}`, backgroundImage: `url(${backgroundImage}` }}>
                  <input style={{ fontFamily: `${font}`, color: 'white' }} className='my-card-title' type='text' id='title' required value={title} onClick={evt => setTitle('')} onChange={evt => setTitle(evt.target.value)} />
                </div>
              </Card.Body>
            </Card>
            <Card className='flex animate__animated animate__fadeIn'>
              <Card.Body>
                <div className='inside-body flex' style={{ border: `${borderType} ${border}`, justifyContent: 'center', alignItems: 'center', backgroundColor: `${backgroundColor}` }}>
                  <textarea style={{ border: 'none', width: '100%', height: '50%', textAlign: `${justification}`, fontFamily: `${font}`, color: `${fontColor}`, backgroundColor: `${backgroundColor}` }} type='textarea' id='message' required value={message} onClick={evt => setMessage('')} onChange={evt => setMessage(evt.target.value)} />

                </div>
                {/* Make border-solid and justification fields in model */}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CardForm
