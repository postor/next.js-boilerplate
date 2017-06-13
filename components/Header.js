import PropTypes from 'prop-types'
import {Link} from './routes'
import MyNav from './MyNav'

const linkStyle = {
  marginRight: 15
}


const activeStyle = {
  color: 'red',
  backgroundColor: '#ddd',
}

const Header = (props) => {
  var {url} = props
  var links = [{
      linkProps: {        route: "index"      },
      children: <a style={linkStyle}>Home</a>,
    },{
      linkProps: {        route: "about"      },
      children: <a style={linkStyle}>About</a>,
      activeStyle: {        color: 'blue',      },
    },{
      linkProps: {        route: "posts"      },
      children: <a style={linkStyle}>Posts</a>,
      checkIsActive: ({pathname})=>{
        return ('/post' ===  pathname) || ('/posts' ===  pathname)
      }
    },
    (props.user && props.user.username)?{
      nolink: true,
      children: <a style={linkStyle} onClick={props.logout}>Logout</a>,
      activeStyle,
    }:{
      linkProps: {        route: "login"      },
      children: <a style={linkStyle}>login</a>,
    },
  ]
  var tprops = {
    ulProps: {
      className: 'mynav',
    },
    links,
    activeStyle,
    activeClassName: 'on',
    url,
  }
  return (<div className="nav-wrap">
      <MyNav {...tprops} />
      <style jsx>{`
        .nav-wrap :global(.mynav) {
          border: 1px solid black;
        }

        .nav-wrap :global(.mynav .on a) {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
} 

export default Header
