
import { Link, Redirect } from 'react-router-dom'

const PhotoSearch = ({ token }) => {
  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <>
      <div>Hello World</div>
      <Link to='/'>Back Home</Link>
    </>
  )
}

export default PhotoSearch
