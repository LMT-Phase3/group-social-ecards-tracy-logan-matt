
import { addFriend, deleteFriend } from '../../api'
import UserCardList from '../../components/cards/UserCardList'
import UserFriends from './UserFriends'

const UserContent = ({ token, username, profileUsername, pathUsername, user, firstName, lastName, email, avatarImage, about, myProfile, setMyProfile, allUsers, setAllUsers }) => {
  const cardProps = { token, username, myProfile, setMyProfile, profileUsername, pathUsername }

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

      {myProfile && (pathUsername !== undefined) && (
        <div>
          <div style={{ flexWrap: 'nowrap', paddingLeft: '40px', justifyContent: 'space-around', marginBottom: '30px', marginTop: '30px' }} className='flex animate__animated animate__fadeIn'>
            <div className='flex-col' style={{ alignItems: 'center', flexBasis: '25%' }}>
              <div className='main-user-profile' style={{ justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: 'black', backgroundImage: `url(${avatarImage})` }} />
              <div className='main-user-title'>
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
            <div style={{ flexBasis: '30%' }} className='main-user-content'>
              <div><span>{firstName}</span><span> {lastName}</span></div>
              <div>{email}</div>
              <div>{about}</div>
            </div>
            <UserFriends style={{ flexBasis: '40%' }} className='flex' user={user} allUsers={allUsers} setAllUsers={setAllUsers} {...cardProps} />
          </div>
          <div style={{ flexWrap: 'nowrap' }} className='flex'>
            <UserCardList className='flex' {...cardProps} />
          </div>
        </div>
      )}

    </div>
  )
}

export default UserContent
