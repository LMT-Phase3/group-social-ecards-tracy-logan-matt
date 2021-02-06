import { useState } from 'react'
import { Redirect } from 'react-router-dom'
// import CardContent from './CardContent'
import PhotoSearch from './PhotoSearch'
import CardForm from './CardForm'

const CreateCard = ({ token, handleDone }) => {
  const [backgroundColor, setBackgroundColor] = useState('black')
  const [border, setBorder] = useState('black')
  const [font, setFont] = useState("Rubik', sans-serif")
  const [title, setTitle] = useState('Your Title')
  const [message, setMessage] = useState('Your Message')
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2700&q=80')

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>
      <div className='flex'>
        <CardForm
          token={token} pk='' handleDone={handleDone} setBackgroundColor={setBackgroundColor} setBorder={setBorder} setFont={setFont} setTitle={setTitle} setMessage={setMessage} setBackgroundImage={setBackgroundImage}
          backgroundColor={backgroundColor} font={font} border={border} backgroundImage={backgroundImage} title={title} message={message}
        />
      </div>
      {/* <CardContent backgroundColor={backgroundColor} border={border} font={font} backgroundImage={backgroundImage} title={title} message={message} /> */}
      <PhotoSearch token={token} setBackgroundImage={setBackgroundImage} />
    </>
  )
}

export default CreateCard
