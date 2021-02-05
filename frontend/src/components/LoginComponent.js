import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { login } from '../api'
import { Redirect, Link } from 'react-router-dom'

const LoginComponent = ({ setAuth, isLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()

  if (isLoggedIn) {
    console.log('I am logged in')
    return <Redirect to='/cards' />
  }
  function handleSubmit (event) {
    event.preventDefault()
    console.log(username, password)
    console.log('Submitting')
    login(username, password)
      .then(data => {
        if (data && data.auth_token) {
          setAuth(username, data.auth_token)
          return <Redirect to='/cards' />
        }
      })
      .catch(error => {
        setErrors(error.message)
      })
  }
  return (

    <>
      <div className='mr-sm-2'>Login</div>
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
        <Link to='/register' className='ml-sm-2'>Need to Register?</Link>
      </Form>
    </>
  )
}
export default LoginComponent
