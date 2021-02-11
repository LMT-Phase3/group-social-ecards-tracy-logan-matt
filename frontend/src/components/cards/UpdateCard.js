import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import PhotoSearch from './createUpdate/PhotoSearch'
import CardForm from './createUpdate/CardForm'

const UpdateCard = ({ token, handleDone, pk, isUpdating, setIsUpdating, card }) => {
  const [backgroundColor, setBackgroundColor] = useState(card.background)
  const [border, setBorder] = useState(card.border)
  const [font, setFont] = useState(card.font)
  const [title, setTitle] = useState(card.title)
  const [message, setMessage] = useState(card.message)
  const [backgroundImage, setBackgroundImage] = useState(card.image_front)
  const [fontColor, setFontColor] = useState(card.font_color)
  const [borderType, setBorderType] = useState(card.border_type)
  const [justify, setJustify] = useState(card.justify)
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
      </div>
      <div className='flex'>
        <CardForm
          token={token} pk={pk} isUpdating={isUpdating} handleDone={handleDone} setBackgroundColor={setBackgroundColor} setBorder={setBorder} setFont={setFont} setTitle={setTitle} setMessage={setMessage} setBackgroundImage={setBackgroundImage}
          backgroundColor={backgroundColor} font={font} border={border} backgroundImage={backgroundImage} title={title} message={message} borderType={borderType} setBorderType={setBorderType}
          fontColor={fontColor} setFontColor={setFontColor} justify={justify} setJustify={setJustify} autoClear='false'
        />
      </div>
      <PhotoSearch token={token} setBackgroundImage={setBackgroundImage} />
    </>
  )
}

export default UpdateCard
