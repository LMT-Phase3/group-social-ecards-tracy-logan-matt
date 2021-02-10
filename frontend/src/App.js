import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Carousel from 'react-bootstrap/Carousel'
import LoginComponent from './components/LoginComponent'
import Register from './components/Register'
import CardList from './components/cards/CardList'
import UserCardList from './components/cards/UserCardList'
import CardDetail from './components/cards/CardDetail'
import CardContent from './components/cards/CardContent'
import UserList from './components/users/UserList'
import UserProfile from './components/users/UserProfile'
import createPersistedState from 'use-persisted-state'
import { getMyCards, getAllUsers, getMyProfile } from './api'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'// import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import { useEffect, useState } from 'react'

const useUsername = createPersistedState('cards_username')
const useToken = createPersistedState('cards_token')

function App () {
  const [username, setUsername] = useUsername()
  const [token, setToken] = useToken()
  const [isCreating, setIsCreating] = useState(false)
  const [myCards, setMyCards] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [myProfile, setMyProfile] = useState()
  let isLoggedIn = (username && token)
  const cardProps = { token, username, isCreating, setIsCreating, myCards, setMyCards, allUsers, setAllUsers, myProfile, setMyProfile }
  const userProps = { token, username, allUsers, setAllUsers, myProfile, setMyProfile }

  useEffect(updateAllCards, [token])

  function updateAllCards () {
    getMyCards(token).then(cards => setMyCards(cards))
  }

  useEffect(updateMyProfile, [token])
  function updateMyProfile () {
    getMyProfile(token).then(user => setMyProfile(user))
  }

  // Use MyCards to be my set of favorites

  useEffect(updateAllUsers, [token])
  function updateAllUsers () {
    getAllUsers(token).then(users => setAllUsers(users))
  }

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  function handleLogOut () {
    setToken(null)
    setIsCreating(false)
    isLoggedIn = false
  }

  function handleHome () {
    setIsCreating(false)
  }

  function handleCreate () {
    setIsCreating(true)
  }

  return (
    <Router>
      <Navbar className='top-navbar' expand='lg'>
        <Navbar.Brand>Cards with Friends</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <LinkContainer onClick={() => handleHome()} to='/'>
              <Nav.Item className='fix-header' style={{ padding: '8px' }}>Home</Nav.Item>
            </LinkContainer>
            <LinkContainer onClick={() => handleCreate()} to='/cards'>
              <Nav.Item className='fix-header' style={{ padding: '8px' }}>Create A Card</Nav.Item>
            </LinkContainer>
            <NavDropdown className='top-dropdown' title='Cards' id='basic-nav-dropdown'>
              <NavDropdown.Item>
                <LinkContainer onClick={() => setIsCreating(false)} to='/mycards'>
                  <Nav.Item>My Cards</Nav.Item>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer onClick={() => setIsCreating(false)} to='/friendscards'>
                  <Nav.Item>Friends Cards</Nav.Item>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer onClick={() => setIsCreating(false)} to='/cards'>
                  <Nav.Item>All Cards</Nav.Item>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>My Favorites</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className='top-dropdown' title='Users' id='basic-nav-dropdown'>
              <NavDropdown.Item>
                <LinkContainer onClick={() => setIsCreating(false)} to='/me'>
                  <Nav.Item style={{ color: 'black' }}>My Profile</Nav.Item>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer onClick={() => setIsCreating(false)} to='/friends'>
                  <Nav.Item>My Friends</Nav.Item>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer onClick={() => setIsCreating(false)} to='/users'>
                  <Nav.Item>All Users</Nav.Item>
                </LinkContainer>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item>Update My Profile</NavDropdown.Item> */}
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
            <CardList apiPath='cards' {...cardProps} />
          </Route>

          <Route path='/mycards'>
            <CardList apiPath='user-cards' {...cardProps} />
          </Route>

          <Route path='/friendscards'>
            <CardList apiPath='friends-cards' {...cardProps} />
          </Route>

          <Route path='/users/:profileUsername/cards'>
            <UserCardList {...cardProps} />
          </Route>

          <Route path='/card/:pk'>
            <CardDetail {...cardProps} />
          </Route>

          <Route path='/me'>
            <UserProfile {...userProps} />
          </Route>

          <Route path='/friends'>
            <UserList {...userProps} />
          </Route>

          <Route path='/users'>
            <UserList {...userProps} />
          </Route>

          <Route path='/user/:profileUsername'>
            <UserProfile {...userProps} />
          </Route>

          <Route path='/'>
            <Jumbotron fluid>

              {/* <Jumbotron className='animate__animated animate__fadeInLeft' fluid> */}
              <Container className='jumbotron-container'>
                <h1 className='splash-title'>Welcome to Card Circle</h1>
                <p className='splash-space'>
                  A space where you can share all your greetings with friends.
                </p>
                <Container className='carousel-container'>
                  <Carousel>

                    <Carousel.Item>
                      <CardContent
                        backgroundColor='pink' font='Lucinda' border='white' title='Happy Birthday' message="You don't look a day older!" fontColor='black' borderType='15px solid' justify='flex-start'
                        backgroundImage='https://images.unsplash.com/photo-1517398823963-c2dc6fc3e837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDQxMTN8MHwxfHNlYXJjaHw1fHxwcmluY2Vzc3xlbnwwfDB8fA&ixlib=rb-1.2.1&q=80&w=1080'
                      />

                    </Carousel.Item>
                    <Carousel.Item>
                      <CardContent
                        backgroundColor='darkgray' font='monospace' border='teal' title='Happy Anniversary' message='Ready for another 50?' fontColor='white' borderType='15px dotted' justify='center'
                        backgroundImage='https://images.unsplash.com/photo-1604668915999-03e1269f6af6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDQxMTN8MHwxfHNlYXJjaHwxMHx8YmFsbG9vbnN8ZW58MHx8fA&ixlib=rb-1.2.1&q=80&w=1080'
                      />

                    </Carousel.Item>
                    <Carousel.Item>
                      <CardContent
                        backgroundColor='black' font='Lucinda' border='white' title='Flowers from My Garden' message='Wishing you a lovely day' fontColor='white' borderType='15px dotted' justify='flex-start'
                        backgroundImage='https://images.unsplash.com/photo-1520690214124-2405c5217036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDQxMTN8MHwxfHNlYXJjaHwzfHxibHVlfGVufDB8MHx8&ixlib=rb-1.2.1&q=80&w=1080'
                      />
                    </Carousel.Item>
                  </Carousel>
                </Container>
              </Container>

            </Jumbotron>

          </Route>

        </Switch>
      </>

    </Router>
  )
}

export default App
