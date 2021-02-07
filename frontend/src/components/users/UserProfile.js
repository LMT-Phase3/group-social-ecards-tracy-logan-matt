import { getUserProfile } from '../../api'
import { useState, useEffect } from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'
import UserNav from './UserNav'
import UserContent from './UserContent'
import UpdateUser from '../cards/UpdateUser'

const UserProfile = ({ token, username }) => {
  const { userPk } = useParams()
  const [user, setUser] = useState([])
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  useEffect(updateUser, [token, userPk])
  function updateUser () {
    getUserProfile(token, userPk).then(user => setUser(user))
  }

  if (!token) {
    return <Redirect to='/' />
  }

  return (
    <>
      {user &&
      (<>{(!isUpdatingProfile)
        ? (
          <div className='flex-col card-detail-all'>
            <div className='flex card-detail-header'>
              <Link className='general-link' to='/users'>Return to User List</Link>
            </div>
            <UserNav token={token} username={username} setIsUpdatingProfile={setIsUpdatingProfile} user={user} userPk={userPk} />
            <UserContent username={user.username} avatar={user.avatar} about={user.about} friends={user.friends} />

          </div>)
        : (
          <UpdateUser
            token={token} userPk={userPk} isUpdatingProfile={isUpdatingProfile} setIsUpdatingProfile={setIsUpdatingProfile} user={user} handleDone={(updatedUser) => {
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
