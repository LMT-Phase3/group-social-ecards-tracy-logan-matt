import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import CreateCard from './CreateCard'
import { getCards } from '../../api'
import { useState, useEffect } from 'react'
import { useParams, useHistory, Link, Redirect } from 'react-router-dom'

const UserCardList = ({ token, username, isCreating, setIsCreating }) => {
  const [cards, setCards] = useState([])
  const { profileUsername } = useParams()
  const apiPath = `/users/${profileUsername}/cards`
  const history = useHistory()

  // const [isCreating, setIsCreating] = useState(false)
  // const apiPath = 'cards'
  useEffect(updateCards, [token, username, apiPath])
  // could write a condition within update cards to make a request to getMyCards
  // or getFriendsCards

  function updateCards () {
    getCards(token, apiPath).then(cards => setCards(cards))
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>{token && cards &&
      (<>{(!isCreating)
        ? (
          <>
            <div className='general-link card-detail-header card-detail-all'><span onClick={() => history.goBack()} style={{ marginRight: '20px' }} className='material-icons sm-nav-icon'>arrow_back</span>{profileUsername}'s Cards</div>
            <ListGroup className='my-list-group'>

              {cards.map(card => (
                <ListGroupItem card={card} key={card.url}>

                  <div style={{ justifyContent: 'space-between' }} className='flex'><span>{card.title}</span><span className='material-icons sm-nav-icon'>favorite_border</span></div>

                  <Link className='card-title' to={`/card/${card.pk}`}>
                    <div className='list-view-image' style={{ backgroundImage: `url(${card.image_front}`, backgroundSize: 'cover' }} />
                  </Link>
                  {/* <Link to={`/users-detail/${card.user.pk}`}> */}
                  <Link to={`/user/${card.user}`}>
                    <div className='flex'>
                      <span>{card.user}</span>
                      {(card.user !== username) && (
                        <span className='material-icons sm-nav-icon'>thumb_up_off_alt</span>
                      )}
                    </div>

                  </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </>)
        : (<CreateCard
            token={token} setIsCreating={setIsCreating} handleDone={(newCard) => {
              setIsCreating(false)
              setCards([newCard, ...cards])
            }}
           />
          )}
      </>

      )}
    </>

  )
}

export default UserCardList
