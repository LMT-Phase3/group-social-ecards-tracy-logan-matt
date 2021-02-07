import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import LoginComponent from './components/LoginComponent'
import Register from './components/Register'
import CardList from './components/CardList'
import CardDetail from './components/CardDetail'
import createPersistedState from 'use-persisted-state'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'// import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import { useState } from 'react'

const useUsername = createPersistedState('cards_username')
const useToken = createPersistedState('cards_token')

function App () {
  const [username, setUsername] = useUsername()
  const [token, setToken] = useToken()
  const [isCreating, setIsCreating] = useState(false)
  // const [cardFilter, setCardFilter] = useState('all')

  // const [creating, setCreating] = useToken(false)

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  function handleCreatingOn () {
    setIsCreating(true)
  }
  function handleCreatingOff () {
    setIsCreating(false)
  }

  const isLoggedIn = (username && token)

  return (
    <Router>
      <Navbar className='top-navbar' expand='lg'>
        <Navbar.Brand>Cards with Friends</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <LinkContainer onClick={() => handleCreatingOff()} to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer onClick={() => handleCreatingOn()} to='/cards'>
              <Nav.Link>Create A Card</Nav.Link>
            </LinkContainer>
            <NavDropdown className='top-dropdown' title='Cards' id='basic-nav-dropdown'>
              <NavDropdown.Item>
                <LinkContainer onClick={() => handleCreatingOff()} to='/mycards'>
                  <Nav.Link style={{ color: 'black' }}>My Cards</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer onClick={() => handleCreatingOff()} to='/friendscards'>
                  <Nav.Link>Friends Cards</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer onClick={() => handleCreatingOff()} to='/cards'>
                  <Nav.Link>All Cards</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>My Favorites</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div>
            {isLoggedIn

              ? <div className='logged-in-info'>Logged in as {username} <button className='button-style' onClick={() => setToken(null)}>Log Out</button></div>
              : <span><Link to='/login'>Login</Link> or <Link to='/register'>Register</Link></span>}

          </div>
        </Navbar.Collapse>
      </Navbar>

      <>
        <Switch>
          <Route path='/register'>
            <Register isLoggedIn={isLoggedIn} setAuth={setAuth} />
          </Route>

          <Route path='/login'>
            <LoginComponent isLoggedIn={isLoggedIn} setAuth={setAuth} />
          </Route>
          <Route path='/cards'>
            <CardList token={token} username={username} isCreating={isCreating} setIsCreating={setIsCreating} />
          </Route>

          <Route path='/mycards' />
          <Route path='/card/:pk'>
            <CardDetail token={token} username={username} />
          </Route>

          <Route path='/'>
            <Jumbotron className='animate__animated animate__fadeInLeft' fluid>
              <Container className='jumbotron-container'>
                <h1 className='splash-title'>Welcome to Card Circle</h1>
                <p className='splash-space'>
                  A space where you can share all your greetings with friends.
                </p>
              </Container>
              <Container className='jumbotron-container'>
                <p>Holder space to add carousel of images</p>
              </Container>
            </Jumbotron>

          </Route>

        </Switch>
      </>

    </Router>
  )
}

export default App
