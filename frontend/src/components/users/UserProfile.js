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
            <UserContent username={user.username} firstName='Tracy' lastName='Falba' email='tfalba@mac.com' about='I am an avid photographer and love my three boys' avatarImage='https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2700&q=80' />

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
