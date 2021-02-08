
import { Redirect } from 'react-router-dom'
import { updateUser } from '../../../api'
import Card from 'react-bootstrap/Card'

const UserForm = ({ token, pk, handleDone, isUpdatingProfile, username, firstName, lastName, email, avatarImage, setFirstName, setLastName, setAvatarImage, setEmail }) => {
  if (!token) {
    return <Redirect to='/' />
  }

  function handleSubmit (event) {
    event.preventDefault()

    updateUser(token, pk, firstName, lastName, email, avatarImage)
      .then(user => {
        handleDone(user)
      })
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div style={{ border: 'solid 2px black', borderRadius: '8px' }} className='card-detail-all'>
        <button type='submit' className='button-style'>Submit Update</button>
      </div>
      <div className='create-card-section flex-col'>
        <div className='create-card-header'>Your Profile</div>
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

        <div className='flex'>
          <Card>
            <Card.Body>
              <div className='card-detail-holder myimage myfont-big' style={{ backgroundImage: `url(${avatarImage}` }} />
            </Card.Body>
          </Card>
          <Card className='flex animate__animated animate__fadeInLeft'>
            <Card.Body>
              <div className='inside-body flex'>
                <input className='my-card-title' type='text' id='first-name' value={firstName} onClick={evt => setFirstName('')} onChange={evt => setFirstName(evt.target.value)} />
                <input className='my-card-title' type='text' id='last-name' value={lastName} onClick={evt => setLastName('')} onChange={evt => setLastName(evt.target.value)} />
                <input className='my-card-title' type='text' id='email' value={email} onClick={evt => setEmail('')} onChange={evt => setEmail(evt.target.value)} />
              </div>
              {/* Make border-solid and justification fields in model */}
            </Card.Body>
          </Card>
        </div>
      </div>
    </form>
  )
}

export default UserForm
