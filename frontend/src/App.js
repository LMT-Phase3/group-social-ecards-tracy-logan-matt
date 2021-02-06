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
import PhotoSearch from './components/PhotoSearch'
import createPersistedState from 'use-persisted-state'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'// import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'

const useUsername = createPersistedState('cards_username')
const useToken = createPersistedState('cards_token')

function App () {
  const [username, setUsername] = useUsername()
  const [token, setToken] = useToken()
  // const [creating, setCreating] = useToken(false)

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  // function handleCreating () {
  //   setCreating(true)
  // }

  const isLoggedIn = (username && token)

  return (
    <Router>
      <Navbar className='top-navbar' expand='lg'>
        <Navbar.Brand>Cards with Friends</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/cards'>
              <Nav.Link>Create A Card</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/photos'>
              <Nav.Link>Search Photos</Nav.Link>
            </LinkContainer>
            <NavDropdown className='top-dropdown' title='Cards' id='basic-nav-dropdown'>
              <NavDropdown.Item>
                <LinkContainer to='/cards'>
                  <Nav.Link style={{ color: 'black' }}>My Cards</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer to='/register'>
                  <Nav.Link>Friends Cards</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer to='/'>
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
            <CardList token={token} username={username} />
          </Route>

          <Route path='/card/:pk'>
            <CardDetail token={token} username={username} />
          </Route>

          <Route path='/photos'>
            <PhotoSearch token={token} username={username} />
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
