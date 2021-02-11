
import Card from 'react-bootstrap/Card'

const CardContent = ({ backgroundColor, border, font, backgroundImage, title, message, fontColor, borderType, justify }) => {
  let justification = 'center'
  if (justify === 'left') {
    justification = 'flex-start'
  } else if (justify === 'right') {
    justification = 'flex-end'
  }

  return (
    <div className='create-card-section flex-col'>
      <div className='flex'>
        <Card>
          <Card.Body>
            <div className='card-detail-holder myimage myfont-big' style={{ color: 'white', backgroundImage: `url(${backgroundImage}` }}><span style={{ fontFamily: `${font}` }} className='my-card-title'>{title}</span></div>
          </Card.Body>
        </Card>
        <Card className='flex animate__animated animate__fadeIn'>
          <Card.Body>
            <div className='inside-body' style={{ border: `${borderType} ${border}`, justifyContent: `${justification}`, alignItems: 'center', color: `${fontColor}`, backgroundColor: `${backgroundColor}` }}><span style={{ textAlign: `${justify}`, fontFamily: `${font}` }}>{message}</span></div>
            {/* Make border-solid and justification fields in model */}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default CardContent
