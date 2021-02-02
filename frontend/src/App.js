import './App.css'
import { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import LoginComponent from './components/LoginComponent'
// import Button from 'react-bootstrap/Button'

function App () {
  const [username, setUsername] = useState()
  const [token, setToken] = useState()
  const [listCards, setCards] = useState(0)

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  // Make this work like a filter to select which card list to present... can be a render of all Cards if...
  function showCards (filter) {
    if (token) {
      setCards(filter)
    }
    // instead of a boolean make this a choice
  }

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>Social Circle Cards</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#link'>Link</Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item onClick={() => showCards(1)}>My Cards</NavDropdown.Item>
              <NavDropdown.Item onClick={() => showCards(2)}>Friends Cards</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
          {token
            ? <div>Logged in as {username} </div>
            : <LoginComponent setAuth={setAuth} />}
        </Navbar.Collapse>
      </Navbar>
      {((listCards === 0) && token && (<h3>All the Cards</h3>))}
      {((listCards === 1) && token) && (<h3>Here is my Cards</h3>)}
      {((listCards === 2) && token) && (<h3>Here are friends Cards</h3>)}
    </>
  )
}

export default App
