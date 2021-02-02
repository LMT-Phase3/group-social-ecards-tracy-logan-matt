
const CardList = ({ listCards }) => {
  return (
    <>
      {listCards.map((card, idx) => (
        <div card={card} key={idx}>
          {card.title}
        </div>
      ))}
    </>
  )
}

export default CardList
