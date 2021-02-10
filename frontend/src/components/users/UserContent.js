
import { Link } from 'react-router-dom'
import { addFriend, deleteFriend } from '../../api'
import UserCardList from '../../components/cards/UserCardList'
import UserFriends from './UserFriends'

const UserContent = ({ token, username, profileUsername, pathUsername, user, firstName, lastName, email, avatarImage, about, myProfile, setMyProfile, allUsers, setAllUsers }) => {
  const cardProps = { token, username, myProfile, setMyProfile }

  if (profileUsername === undefined) {
    pathUsername = username
  }

  function handleFollow (newuser) {
    addFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
  }

  function handleUnFollow (newuser) {
    deleteFriend(token, newuser).then(updatedFriends => setMyProfile(updatedFriends))
  }

  return (
    <div>

      {myProfile && (
        <div>
          <div className='animate__animated animate__fadeIn'>
            <div>
              <div className='user-card-profile' style={{ justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: `url(${avatarImage})` }} />
              <div className='flex'>
                <span>{user.username}</span>
                {(user.username !== username) && (
                  <>
                    {(myProfile.friends.includes(user.username))
                      ? <span onClick={() => handleUnFollow(user.username)} style={{ color: 'grey' }} className='material-icons sm-nav-icon'>thumb_up</span>

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
          <div style={{ flexWrap: 'nowrap' }} className='flex'>

            <UserCardList className='flex' {...cardProps} />

            <UserFriends className='flex' token={token} user={user} pathUsername={pathUsername} profileUsername={profileUsername} allUsers={allUsers} setAllUsers={setAllUsers} />

          </div>
        </div>
      )}

    </div>
  )
}

export default UserContent
