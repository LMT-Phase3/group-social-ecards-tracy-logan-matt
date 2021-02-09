
import { Link } from 'react-router-dom'
import { addFriend } from '../../api'

const UserContent = ({ token, username, profileUsername, pathUsername, user, firstName, lastName, email, avatarImage, about, myProfile, setMyProfile }) => {
  if (profileUsername === undefined) {
    pathUsername = username
  }

  function handleFollow (newuser) {
    addFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
  }

  return (
    <>
      <div style={{ }} className='create-card-section flex-col'>
        <div style={{ width: '60%', justifyContent: 'space-around' }} className='flex animate__animated animate__fadeIn'>
          <div style={{ color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className='user-card-profile' style={{ justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: `url(${avatarImage})` }} />

            {/* <div>{profileUsername}</div> */}

            <div className='flex'>
              <span>{user.username}</span>
              {(user.username !== username) && (
                <>
                  {(myProfile.friends.includes(user.username))
                    ? <span style={{ color: 'grey' }} className='material-icons sm-nav-icon'>thumb_up</span>

                    : <span onClick={() => handleFollow(user.username)} className='material-icons sm-nav-icon'>thumb_up_off_alt</span>}
                </>
              )}
            </div>

          </div>
          <div style={{ color: 'black' }}>
            <div><span>{firstName}</span><span> {lastName}</span></div>
            <div>{email}</div>
            <div>{about}</div>
          </div>
        </div>
        <Link className='create-bar-header create-card-header' to={`/users/${pathUsername}/cards`}>{pathUsername}'s Cards</Link>
      </div>
    </>
  )
}

export default UserContent
