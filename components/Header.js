
import PropTypes from 'prop-types'
import {Link,MyNav} from './routes'


const linkStyle = {
  marginRight: 15
}


const activeStyle = {
  color: 'red',
  backgroundColor: '#ddd',
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

const Header1 = (props) => {
  var url = props.url
  var links = [
    {
      linkProps: {
        route: "index"
      },
      liProps: {},
      url,
      children: <a style={linkStyle}>Home</a>,
      activeStyle,
    },
    {
      linkProps: {
        route: "about"
      },
      liProps: {},
      url,
      children: <a style={linkStyle}>About</a>,
      activeStyle,
    },
    (props.user && props.user.username)?{
      nolink: true,
      linkProps: {},
      liProps: {},
      url,
      children: <a style={linkStyle} onClick={props.logout}>Logout</a>,
      activeStyle,
    }:{
      linkProps: {
        route: "login"
      },
      liProps: {},
      url,
      children: <a style={linkStyle}>login</a>,
      activeStyle,
    },
  ]
  var tprops = {
    ulProps: {},
    links,
  }
  return (
    <MyNav {...tprops} />
  )
} 

export default Header1
