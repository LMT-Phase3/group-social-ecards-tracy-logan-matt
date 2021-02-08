
const UserContent = ({ token, username, profileUsername, firstName, lastName, email, avatarImage, about }) => {
  return (
    <>
      <div className='create-card-header'>Show {profileUsername} Cards</div>
      <div style={{ alignItems: 'center', width: '90%' }} className='create-card-section flex-col'>
        <div style={{ width: '60%', justifyContent: 'space-around', alignItems: 'center' }} className='flex animate__animated animate__fadeIn'>
          <div style={{ color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className='user-card-profile' style={{ justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: `url(${avatarImage})` }} />
            <div>{profileUsername}</div>
          </div>
          <div style={{ color: 'black' }}>
            <div><span>{firstName}</span><span> {lastName}</span></div>
            <div>{email}</div>
            <div>{about}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserContent
