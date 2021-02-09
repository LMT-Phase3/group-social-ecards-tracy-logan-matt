import { getUserProfile } from '../../api'
import { useState, useEffect } from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'
import UserNav from './UserNav'
import UserContent from './UserContent'
import UpdateUser from './UpdateUser'
import UserFriends from './UserFriends'

const UserProfile = ({ token, username, allUsers, setAllUsers, myProfile, setMyProfile }) => {
  const { profileUsername } = useParams()
  const [user, setUser] = useState()
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  // useEffect(updateUser, [token, profileUsername])
  // function updateUser () {
  //   getUserProfile(token, profileUsername).then(user => setUser(user))
  // }
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
            <div className='flex card-detail-header'>
              <Link className='general-link' to='/users'>Return to User List</Link>
            </div>
            <UserNav token={token} user={user} username={username} setIsUpdatingProfile={setIsUpdatingProfile} profileUsername={profileUsername} pathUsername={pathUsername} />
            <div style={{ justifyContent: 'space-around', marginTop: '30px' }} className='flex'>
              <UserContent
                token={token} user={user} pathUsername={pathUsername} username={username} profileUsername={profileUsername} firstName={user.first_name} lastName={user.last_name}
                email={user.email} about={user.about} avatarImage={user.avatar} myProfile={myProfile} setMyProfile={setMyProfile}
              />
              <UserFriends token={token} user={user} pathUsername={pathUsername} profileUsername={profileUsername} allUsers={allUsers} setAllUsers={setAllUsers} />

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
