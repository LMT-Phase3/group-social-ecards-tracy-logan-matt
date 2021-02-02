import './App.css'
// import Navbar from 'react-bootstrap/Navbar'
// import Form from 'react-bootstrap/Form'
// import InputGroup from 'react-bootstrap/InputGroup'
// import FormControl from 'react-bootstrap/FormControl'
// import Button from 'react-bootstrap/Button'
import LoginComponent from './components/LoginComponent'
import { useState } from 'react'

function App () {
  const [username, setUsername] = useState()
  const [token, setToken] = useState()

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }
  return (
    <>
      {token
        ? <div>Logged in as {username} </div>
        : <LoginComponent setAuth={setAuth} />}
    </>
  )
}

export default App
