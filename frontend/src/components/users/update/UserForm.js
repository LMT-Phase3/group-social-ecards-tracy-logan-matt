
import { Redirect } from 'react-router-dom'
import { updateUser } from '../../../api'
// import Card from 'react-bootstrap/Card'
// import UserContent from '../UserContent'

const UserForm = ({ token, handleDone, isUpdatingProfile, profileUsername, firstName, lastName, email, avatarImage, about, setFirstName, setLastName, setAvatarImage, setEmail, setAbout }) => {
  if (!token) {
    return <Redirect to='/' />
  }
  function handleSubmit (event) {
    event.preventDefault()

    updateUser(token, profileUsername, firstName, lastName, email, about, avatarImage)
      .then(user => {
        handleDone(user)
      })
  }

  return (
    <form className='flex-col card-detail-all' style={{ width: '90%', alignItems: 'flex-start' }} onSubmit={(event) => handleSubmit(event)}>
      <div style={{ width: '100%', alignItems: 'flex-start' }} className='create-card-section flex-col'>
        <div style={{ width: '100%', justifyContent: 'flex-start' }} className='create-card-header flex'>Your Profile</div>
        {/* INSERTING USER CONTENT HERE */}
        <>
          <div style={{ alignItems: 'center', width: '90%' }} className='create-card-section flex-col'>
            <div style={{ border: '3px solid #0000002b', padding: '10px', borderRadius: '10px', width: '100%', justifyContent: 'space-around', alignItems: 'center' }} className='flex animate__animated animate__fadeInLeft'>
              <div style={{ color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className='user-card-profile' style={{ justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundSize: 'cover', backgroundImage: `url(${avatarImage})` }} />
                <div>{profileUsername}</div>
              </div>
              <div style={{ color: 'black' }}>
                <div>
                  <span>
                    <label htmlFor='first-name'>First Name: </label>
                    <input type='text' id='first-name' value={firstName} onClick={evt => setFirstName('')} onChange={evt => setFirstName(evt.target.value)} />
                  </span>
                  <span>
                    <label htmlFor='last-name'>Last Name: </label>
                    <input type='text' id='last-name' value={lastName} onClick={evt => setLastName('')} onChange={evt => setLastName(evt.target.value)} />
                  </span>
                </div>
                <div>
                  <label htmlFor='email'>Email: </label>
                  <input type='text' id='email' value={email} onClick={evt => setEmail('')} onChange={evt => setEmail(evt.target.value)} />
                </div>
                <div>
                  <label htmlFor='about'>About: </label>
                  <textarea type='text' id='about' value={about} onClick={evt => setAbout('')} onChange={evt => setAbout(evt.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <button type='submit' className='button-style'>Submit Update</button>

    </form>
  )
}

export default UserForm
