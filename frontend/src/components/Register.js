import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { register } from '../api'
import { Redirect } from 'react-router-dom'

const Register = ({ setAuth, isLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()

  if (isLoggedIn) {
    return <Redirect to='/cards' />
  }
  function handleSubmit (event) {
    event.preventDefault()
    register(username, password)
      .then(data => {
        if (data && data.auth_token) {
          setAuth(username, data.auth_token)
        }
      })
      .catch(error => {
        setErrors(error.message)
      })
  }
  return (

    <>
      <div className='mr-sm-2'>Register</div>
      <Form onSubmit={handleSubmit} inline>
        {errors && (
          <div className='bg-red white pa3'>{errors}</div>
        )}
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
export default Register
