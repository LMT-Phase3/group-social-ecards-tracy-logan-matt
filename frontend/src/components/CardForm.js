
import { Redirect } from 'react-router-dom'
import { createCard, updateCard } from '../api'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'

const CardForm = ({ token, pk, isUpdating, handleDone, setBackgroundColor, setBorder, setFont, setTitle, setMessage, setBackgroundImage, backgroundColor, font, border, backgroundImage, title, message }) => {
  if (!token) {
    return <Redirect to='/' />
  }

  function handleSubmit (event) {
    event.preventDefault()
    console.log('at top of handle submit')
    console.log(isUpdating)
    if (!isUpdating) {
      createCard(token, backgroundColor, font, border, backgroundImage, title, message)
        .then(card => {
          handleDone(card)
        })
    } else {
      console.log('I am here')
      updateCard(token, pk, backgroundColor, font, border, backgroundImage, title, message)
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
        {/* <div style={{ marginTop: '25px', paddingLeft: '15px', paddingRight: '15px' }} className='flex'>
          <label className='title-label' htmlFor='title'>Title</label>
          <input type='text' id='title' required value={title} onClick={evt => setTitle('')} onChange={evt => setTitle(evt.target.value)} />
          <label className='message-label' htmlFor='message'>Message</label>
          <input type='textarea' id='message' required value={message} onClick={evt => setMessage('')} onChange={evt => setMessage(evt.target.value)} />
        </div> */}
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
          </DropdownButton>
          {/* <div>Select Justification</div> */}
          {/* Add justification later once gets put into models on the backend */}
        </div>
        <button type='submit' className='button-style'>Submit Card</button>
      </div>
      <div className='create-card-section flex-col'>
        <div className='create-card-header'>Your Card</div>
        <div className='flex'>
          <Card>
            <Card.Body>
              {/* <div className='card-detail-holder myimage myfont-big' style={{ color: 'white', backgroundImage: `url(${backgroundImage}` }}><span style={{ fontFamily: `${font}` }} className='my-card-title'>{title}</span></div> */}
              <div className='card-detail-holder myimage myfont-big' style={{ color: 'white', backgroundImage: `url(${backgroundImage}` }}>
                <input style={{ fontFamily: `${font}`, color: 'white' }} className='my-card-title' type='text' id='title' required value={title} onClick={evt => setTitle('')} onChange={evt => setTitle(evt.target.value)} />
              </div>
            </Card.Body>
          </Card>
          <Card className='flex animate__animated animate__fadeInLeft'>
            <Card.Body>
              <div className='inside-body flex' style={{ border: `20px solid ${border}`, justifyContent: 'center', alignItems: 'center', backgroundColor: `${backgroundColor}` }}>
                {/* <span style={{ fontFamily: `${font}` }}>{message}</span> */}
                <textarea style={{ border: 'none', width: '100%', height: '50%', textAlign: 'right', fontFamily: `${font}`, color: 'white', backgroundColor: `${backgroundColor}` }} type='textarea' id='message' required value={message} onClick={evt => setMessage('')} onChange={evt => setMessage(evt.target.value)} />

              </div>
              {/* Make border-solid and justification fields in model */}
            </Card.Body>
          </Card>
        </div>
      </div>
    </form>
  )
}

export default CardForm