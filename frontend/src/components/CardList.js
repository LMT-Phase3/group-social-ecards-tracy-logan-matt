import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

const CardList = ({ listCards }) => {
  return (
    <ListGroup className='ml-sm-4 mr-sm-4'>
      {listCards.map((card, idx) => (
        <ListGroupItem card={card} key={idx}>
          {card.title}
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

export default CardList
