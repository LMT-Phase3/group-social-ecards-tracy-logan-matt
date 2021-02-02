import './App.css'
import { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import LoginComponent from './components/LoginComponent'
import CardList from './components/CardList'
import { fakeCards, fakeFriendsCards } from './fakeCards'
// import Button from 'react-bootstrap/Button'

function App () {
  const [username, setUsername] = useState()
  const [token, setToken] = useState()
  const [listCards, setCards] = useState(fakeCards)

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
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Create a Card</Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item onClick={() => showCards(fakeFriendsCards)}>My Cards
                {/* <NavDropdown.Item onClick={() => showCards(1)}>My Liked Cards</NavDropdown.Item>
                <NavDropdown.Item onClick={() => showCards(2)}>My Received Cards</NavDropdown.Item>
                <NavDropdown.Item onClick={() => showCards(3)}>My Sent Cards</NavDropdown.Item> */}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => showCards(fakeFriendsCards)}>Friends Cards</NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Separated link</NavDropdown.Item>
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
      {token && (
        <>
          <h3 className='ml-sm-4'>All the Cards</h3>
          <CardList listCards={listCards} />
        </>
      )}
      {(token === undefined) && (
        <Jumbotron className='animate__animated animate__fadeInLeft' fluid>
          <Container className='jumbotron-container'>
            <h1 className='splash-title'>Welcome to Card Circle</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal space of
              its parent.
            </p>
          </Container>
        </Jumbotron>
      )}
    </>
  )
}

export default App
