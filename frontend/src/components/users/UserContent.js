
const UserContent = ({ username, firstName, lastName, email, avatarImage, about }) => {
  return (
    <>
      <div className='create-card-header'>Show {username} Cards</div>
      <div style={{ alignItems: 'center', width: '90%' }} className='create-card-section flex-col'>
        <div style={{ border: '3px solid black', width: '100%', justifyContent: 'space-around', alignItems: 'center' }} className='flex animate__animated animate__fadeInLeft'>
          <div style={{ color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className='user-card-profile' style={{ justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: `url(${avatarImage})` }} />
            <div>{username}</div>
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
