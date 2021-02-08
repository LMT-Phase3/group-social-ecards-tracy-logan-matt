import { getUserProfile } from '../../api'
import { useState, useEffect } from 'react'
import { Redirect, Link, useParams } from 'react-router-dom'
import UserNav from './UserNav'
import UserContent from './UserContent'
import UpdateUser from './UpdateUser'

const UserProfile = ({ token, username }) => {
  const { pk } = useParams()
  const [user, setUser] = useState([])
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  useEffect(updateUser, [token, pk])
  function updateUser () {
    getUserProfile(token, pk).then(user => setUser(user))
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
            <UserNav token={token} username={username} setIsUpdatingProfile={setIsUpdatingProfile} user={user} pk={pk} />
            {/* <UserContent username={user.username} avatar={user.avatar} about={user.about} friends={user.friends} /> */}
            <UserContent username={user.username} friends={user.friends} firstName='Tracy' lastName='Falba' email='tfalba@mac.com' about='I am an avid photographer and love my three boys' />

          </div>)
        : (
          <UpdateUser
            token={token} pk={pk} isUpdatingProfile={isUpdatingProfile} setIsUpdatingProfile={setIsUpdatingProfile} user={user} handleDone={(updatedUser) => {
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
