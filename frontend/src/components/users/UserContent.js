
const UserContent = ({ username, firstName, lastName, email, about }) => {
  return (
    <div className='create-card-section flex-col'>
      <div className='create-card-header'>{username}</div>
      <div className='flex'>
        <div style={{ width: '400px', height: '200px', border: '3px solid black' }} className='flex animate__animated animate__fadeInLeft'>
          <div style={{ color: 'black' }}>
            <div className='user-card-profile' style={{ justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: "url('https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2700&q=80')" }} />
            {/* Make border-solid and justification fields in model */}
            <span>{firstName}</span><span> {lastName}</span>
          </div>
          <div style={{ color: 'black' }}>
            <span>{about}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserContent
