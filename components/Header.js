
import {Link} from './routes'
import PropTypes from 'prop-types'


const linkStyle = {
  marginRight: 15
}


const Login = ()=>{
  return <Link route="login">
    <a style={linkStyle}>Login</a>
  </Link>
}

const Logout = (props)=>{
  return <a style={linkStyle} href="###" onClick={props.logout}>{props.user.username} logout</a>
}

const Header = (props) => {
  return (
    <div>
        <Link route="index">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link route="about">
          <a style={linkStyle}>About</a>
        </Link>
        {(props.user && props.user.username)?<Logout {...props} />:<Login />}
    </div>
  )
} 



export default Header
