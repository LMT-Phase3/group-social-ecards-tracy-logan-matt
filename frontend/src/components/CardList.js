import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { getCards } from '../api'
import { useState, useEffect } from 'react'
import CardDetail from './CardDetail'

// import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'// import Button from 'react-bootstrap/Button'

const CardList = ({ token, setViewDetail, viewDetail }) => {
  const [cards, setCards] = useState([])
  const [pk, setPk] = useState('')
  const [key, setKey] = useState('')
  useEffect(() => {
    getCards(token).then(cards => setCards(cards))
  }, [token])

  if (!token) {
    return <Redirect to='/login' />
  }
  function showDetail (id, key) {
    if (!viewDetail) {
      setViewDetail(true)
      setPk(id)
      setKey(key)
    }
  }
  return (
    <>{(viewDetail === false)
      ? (
        <Router>
          <ListGroup style={{ justifyContent: 'center' }} className='ml-sm-4 mr-sm-4'>
            {cards.map((card, idx) => (
              <ListGroupItem card={card} key={idx}>
                <Link className='card-title' onClick={() => showDetail(card.pk, idx)} to={`/card-detail/${card.pk}/`}>Title: {card.title}</Link>
                <div className='list-view-image' style={{ backgroundImage: `url(${card.image_front}`, backgroundSize: 'cover' }} />
                <div>User: {card.user}</div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Router>
        )
      : (
        <Router>
          <Switch>
            <Route path={`/card-detail/${pk}`}>
              <>
                <CardDetail idx={key} token={token} pk={pk} viewDetail={viewDetail} setViewDetail={setViewDetail} cards={cards} />
              </>
            </Route>
          </Switch>
        </Router>
        )}

    </>

  )
}

export default CardList
