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
          <ListGroup className='my-list-group'>
            {cards.map((card, idx) => (
              <ListGroupItem card={card} key={idx}>

                <div style={{ justifyContent: 'space-between' }} className='flex'><span>{card.title}</span><span className='material-icons sm-nav-icon'>favorite_border</span></div>

                <Link className='card-title' onClick={() => showDetail(card.pk, idx)} to={`/card-detail/${card.pk}/`}>
                  <div className='list-view-image' style={{ backgroundImage: `url(${card.image_front}`, backgroundSize: 'cover' }} />
                </Link>
                <div className='flex'><span>{card.user}</span><span className='material-icons sm-nav-icon'>thumb_up_off_alt</span></div>
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
