import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import AvatarSearch from './update/AvatarSearch'
import UserForm from './update/UserForm'

const UpdateUser = ({ token, handleDone, profileUsername, user, isUpdatingProfile, setIsUpdatingProfile, username, pathUsername }) => {
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)
  const [email, setEmail] = useState(user.email)
  const [avatarImage, setAvatarImage] = useState(user.avatar)
  const [about, setAbout] = useState(user.about)

  if (!token) {
    return <Redirect to='/login' />
  }
  if (profileUsername === undefined) {
    pathUsername = username
  }

  return (
    <>
      <div className='flex card-detail-all card-detail-header'>
        <Link className='general-link' to='/users'>Return to All Users</Link>
      </div>
      <div className='flex'>

        <UserForm
          token={token} handleDone={handleDone} profileUsername={pathUsername} firstName={firstName} setFirstName={setFirstName}
          lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail}
          avatarImage={avatarImage} setAvatarImage={setAvatarImage} isUpdatingProfile={isUpdatingProfile} about={about} setAbout={setAbout}
        />
      </div>
      {/* <CardContent backgroundColor={backgroundColor} border={border} font={font} backgroundImage={backgroundImage} title={title} message={message} /> */}
      <AvatarSearch token={token} setAvatarImage={setAvatarImage} />
    </>
  )
}

export default UpdateUser
