
import Card from 'react-bootstrap/Card'

const UserContent = ({ username, firstName }) => {
  return (
    <div className='create-card-section flex-col'>
      <div className='create-card-header'>{username}</div>
      <div className='flex'>
        <Card className='flex animate__animated animate__fadeInLeft'>
          <Card.Body>
            <div className='inside-body' style={{ border: '5px solid black', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black' }}><span style={{ color: 'white' }}>{firstName}</span></div>
            {/* Make border-solid and justification fields in model */}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default UserContent
