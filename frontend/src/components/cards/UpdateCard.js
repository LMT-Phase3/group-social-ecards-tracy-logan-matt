import { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
// import CardContent from './CardContent'
import PhotoSearch from './createUpdate/PhotoSearch'
import CardForm from './createUpdate/CardForm'

const UpdateCard = ({ token, handleDone, pk, isUpdating, setIsUpdating, card, cardFilter, setCardFilter, handleCardsFilter }) => {
  const [backgroundColor, setBackgroundColor] = useState(card.background)
  const [border, setBorder] = useState(card.border)
  const [font, setFont] = useState(card.font)
  const [title, setTitle] = useState(card.title)
  const [message, setMessage] = useState(card.message)
  const [backgroundImage, setBackgroundImage] = useState(card.image_front)
  const [fontColor, setFontColor] = useState(card.font_color)
  const [borderType, setBorderType] = useState(card.border_type)
  const history = useHistory()
  if (!token) {
    return <Redirect to='/login' />
  }

  function handleGoBack (card) {
    handleDone(card)
    history.goBack()
  }
  return (
    <>
      <div className='flex card-detail-all card-detail-header'>
        <button className='general-link' onClick={() => handleGoBack({ card })}>Return to Cards List</button>

        {/* <Link onClick={() => handleCardsFilter('all')} className='general-link' to='/cards'>Return to Cards List</Link> */}

        {/* {(cardFilter === 'any') && (
          <Link onClick={() => handleDone()} className='general-link' to='/cards'>Return to Cards List</Link>
        )}
        {(cardFilter === 'my') && (
          <Link onClick={() => handleDone()} className='general-link' to='/mycards'>Return to Cards List</Link>
        )}
        {(cardFilter === 'friends') && (
          <Link onClick={() => handleDone()} className='general-link' to='/friendscards'>Return to Cards List</Link>
        )} */}

      </div>
      <div className='flex'>

        <CardForm
          token={token} pk={pk} isUpdating={isUpdating} handleDone={handleDone} setBackgroundColor={setBackgroundColor} setBorder={setBorder} setFont={setFont} setTitle={setTitle} setMessage={setMessage} setBackgroundImage={setBackgroundImage}
          backgroundColor={backgroundColor} font={font} border={border} backgroundImage={backgroundImage} title={title} message={message} borderType={borderType} setBorderType={setBorderType}
          fontColor={fontColor} setFontColor={setFontColor}
        />
      </div>
      {/* <CardContent backgroundColor={backgroundColor} border={border} font={font} backgroundImage={backgroundImage} title={title} message={message} /> */}
      <PhotoSearch token={token} setBackgroundImage={setBackgroundImage} />
    </>
  )
}

export default UpdateCard
