// import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
// import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

const LoginComponent = ({ setAuth }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  function handleSubmit (event) {
    event.preventDefault()
    console.log(username, password)
    console.log('Submitting')
    setAuth(username, '1234')
  }
  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit} inline>
        <FormControl
          type='text'
          placeholder='Username'
          aria-label='Username'
          aria-describedby='basic-addon1'
          className='mr-sm-2'
          value={username}
          onChange={evt => setUsername(evt.target.value)}
        />
        <FormControl
          type='password'
          placeholder='Password'
          aria-label='Password'
          aria-describedby='basic-addon1'
          className='mr-sm-2'
          value={password}
          onChange={evt => setPassword(evt.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </>
  )
}
export default LoginComponent
