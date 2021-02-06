
import Card from 'react-bootstrap/Card'

const CardContent = ({ backgroundColor, border, font, backgroundImage, title, message }) => {
  return (
    <div className='create-card-section flex-col'>
      <div className='create-card-header'>Your Card</div>
      <div className='flex'>
        <Card>
          <Card.Body>
            <div className='card-detail-holder myimage myfont-big' style={{ color: 'white', backgroundImage: `url(${backgroundImage}` }}><span style={{ fontFamily: `${font}` }} className='my-card-title'>{title}</span></div>
          </Card.Body>
        </Card>
        <Card className='flex animate__animated animate__fadeInLeft'>
          <Card.Body>
            <div className='inside-body' style={{ border: `20px solid ${border}`, justifyContent: 'center', alignItems: 'center', backgroundColor: `${backgroundColor}` }}><span style={{ fontFamily: `${font}` }}>{message}</span></div>
            {/* Make border-solid and justification fields in model */}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default CardContent
