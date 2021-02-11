
import UserCardList from '../../components/cards/UserCardList'
import UserFriends from './UserFriends'
import UserFollowers from './UserFollowers'

const UserContent = ({ token, username, profileUsername, pathUsername, user, firstName, lastName, email, avatarImage, about, myProfile, setMyProfile, allUsers, setAllUsers, myFavorites, setMyFavorites, handleFollow, handleUnFollow, handleFavorite, handleUnFavorite }) => {
  const cardProps = { token, username, myProfile, setMyProfile, profileUsername, pathUsername, myFavorites, setMyFavorites, handleFollow, handleUnFollow, handleFavorite, handleUnFavorite }

  if (profileUsername === undefined) {
    pathUsername = username
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
                <div style={{ flexBasis: '25%' }} className='main-user-content'>
                  <div><span>{firstName}</span><span> {lastName}</span></div>
                  <div>{email}</div>
                  <div>{about}</div>
                </div>
              </div>
            </div>
            {/* <UserList userApiPath='user-followers' {...userProps} />
            <UserList userApiPath='user-friends' {...userProps} /> */}

            <UserFriends style={{ flexBasis: '40%' }} className='flex' user={user} allUsers={allUsers} setAllUsers={setAllUsers} {...cardProps} />
            <UserFollowers style={{ flexBasis: '40%' }} className='flex' user={user} allUsers={allUsers} setAllUsers={setAllUsers} {...cardProps} />

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
