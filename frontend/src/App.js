import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import LoginComponent from './components/LoginComponent'
import Register from './components/Register'
import CardList from './components/cards/CardList'
import CardDetail from './components/cards/CardDetail'
import UserList from './components/users/UserList'
import UserProfile from './components/users/UserProfile'
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
  const [cardFilter, setCardFilter] = useState('all')
  const [userFilter, setUserFilter] = useState('all')
  let isLoggedIn = (username && token)
  const cardProps = { token, username, cardFilter, isCreating, setIsCreating, setCardFilter, handleCardsFilter }
  const userProps = { token, username, userFilter }

  // const [creating, setCreating] = useToken(false)

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  function handleCardsFilter (whichSet) {
    setIsCreating(false)
    setCardFilter(whichSet)
    setUserFilter('all')
  }
  function handleLogOut () {
    setToken(null)
    setIsCreating(false)
    isLoggedIn = false
    setCardFilter('all')
  }

  function handleUserFilter (who) {
    setIsCreating(false)
    setUserFilter(who)
    setCardFilter('all')
  }
  function handleHome () {
    setIsCreating(false)
    setUserFilter('all')
    setCardFilter('all')
  }

  function handleCreate () {
    setIsCreating(true)
    setUserFilter('all')
    setCardFilter('all')
  }
  return (
    <Router>
      <Navbar className='top-navbar' expand='lg'>
        <Navbar.Brand>Cards with Friends</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <LinkContainer onClick={() => handleHome()} to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer onClick={() => handleCreate()} to='/cards'>
              <Nav.Link>Create A Card</Nav.Link>
            </LinkContainer>
            <NavDropdown className='top-dropdown' title='Cards' id='basic-nav-dropdown'>
              <NavDropdown.Item>
                <LinkContainer onClick={() => handleCardsFilter('my')} to='/mycards'>
                  <Nav.Link style={{ color: 'black' }}>My Cards</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer onClick={() => handleCardsFilter('friends')} to='/friendscards'>
                  <Nav.Link>Friends Cards</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer onClick={() => handleCardsFilter('all')} to='/cards'>
                  <Nav.Link>All Cards</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>My Favorites</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className='top-dropdown' title='Users' id='basic-nav-dropdown'>
              <NavDropdown.Item>
                <LinkContainer onClick={() => handleUserFilter('me')} to='/me'>
                  <Nav.Link style={{ color: 'black' }}>My Profile</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer onClick={() => handleUserFilter('friends')} to='/friends'>
                  <Nav.Link>My Friends</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer onClick={() => handleUserFilter('all')} to='/users'>
                  <Nav.Link>All Users</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Update My Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div>
            {isLoggedIn

              ? <div className='logged-in-info'>Logged in as {username} <button className='button-style' onClick={() => handleLogOut()}>Log Out</button></div>
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
            <CardList {...cardProps} />
          </Route>

          <Route path='/mycards'>
            <CardList {...cardProps} />
          </Route>

          <Route path='/friendscards'>
            <CardList {...cardProps} />
          </Route>

          <Route path='/card/:pk'>
            <CardDetail {...cardProps} />
          </Route>

          <Route path='/me'>
            <UserList {...userProps}>Hello Me</UserList>
          </Route>

          <Route path='/friends'>
            <UserList {...userProps}>Hello Friends</UserList>
          </Route>

          <Route path='/users'>
            <UserList {...userProps}>Hello Everyone</UserList>
          </Route>

          <Route path='/user/:pk'>
            <UserProfile {...userProps} />
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
