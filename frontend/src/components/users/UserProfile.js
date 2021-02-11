import { getUserProfile } from '../../api'
import { useState, useEffect } from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'
import UserNav from './UserNav'
import UserContent from './UserContent'
import UpdateUser from './UpdateUser'
// import UserFriends from './UserFriends'

const UserProfile = ({ token, username, allUsers, setAllUsers, myProfile, setMyProfile, myFavorites, setMyFavorites }) => {
  const { profileUsername } = useParams()
  const [user, setUser] = useState()
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  let pathUsername = profileUsername

  useEffect(updateUser, [token, pathUsername])
  function updateUser () {
    getUserProfile(token, pathUsername).then(user => setUser(user))
  }

  if (!token) {
    return <Redirect to='/' />
  }
  if (profileUsername === undefined) {
    pathUsername = username
  }

  return (
    <>
      {user &&
      (<>{(!isUpdatingProfile)
        ? (
          <div className='card-detail-all'>
            <Link className='general-link card-detail-header' to='/users'>Return to User List</Link>
            <UserNav token={token} user={user} username={username} setIsUpdatingProfile={setIsUpdatingProfile} profileUsername={profileUsername} pathUsername={pathUsername} />
            <div>
              <UserContent
                // className='flex-col'
                token={token} user={user} pathUsername={pathUsername} username={username} profileUsername={profileUsername} firstName={user.first_name} lastName={user.last_name}
                email={user.email} about={user.about} avatarImage={user.avatar} myProfile={myProfile} setMyProfile={setMyProfile} allUsers={allUsers} setAllUsers={setAllUsers}
                myFavorites={myFavorites} setMyFavorites={setMyFavorites}
              />
            </div>
          </div>)
        : (
          <UpdateUser
            token={token} profileUsername={profileUsername} pathUsername={pathUsername} username={username} isUpdatingProfile={isUpdatingProfile} setIsUpdatingProfile={setIsUpdatingProfile} user={user} handleDone={(updatedUser) => {
              setIsUpdatingProfile(false)
              setUser(updatedUser)
            }}
          />
          )}
       </>)}
    </>

  )
}

export default UserProfile
