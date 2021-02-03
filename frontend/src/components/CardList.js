import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { getCards } from '../api'
import { useState, useEffect } from 'react'
import CardDetail from './CardDetail'

// import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'// import Button from 'react-bootstrap/Button'

const CardList = ({ token }) => {
  const [cards, setCards] = useState([])
  useEffect(() => {
    getCards(token).then(cards => setCards(cards))
  }, [token])

  if (!token) {
    return <Redirect to='/login' />
  }
  // function viewDetail () {
  //   console.log('I clicked to view')
  //   return <Redirect to='/register' />
  // }
  return (
    <Router>
      <ListGroup className='ml-sm-4 mr-sm-4'>
        {cards.map((card, idx) => (
          <ListGroupItem card={card} key={idx}>
            <Link to='/card-detail'>Title: {card.title}</Link>
            <div>User: {card.user}</div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <Switch>
        <Route path='/card-detail'>
          <>
            <h3 className='ml-sm-4'>Card Detail</h3>
            <CardDetail token={token} id={1} />
          </>
        </Route>
      </Switch>
    </Router>

  )
}

export default CardList
