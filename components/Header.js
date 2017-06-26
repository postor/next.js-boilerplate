import PropTypes from 'prop-types'
import getNavigation from 'next-navigation'

import { default as routes, Link } from '../tools/routes'
import i18nHelper from '../tools/i18n-helper'

const MyNav = getNavigation(routes)


const linkStyle = {
  marginRight: 15
}


const activeStyle = {
  color: 'red',
  backgroundColor: '#ddd',
}

const Header = (props) => {
  var { url } = props
  var links = [{
    linkProps: { route: "index" },
    children: <a style={linkStyle}>{i18nHelper.t('Home')}</a>, //translate((props)=>(<a style={linkStyle}>{props.t('Home')}</a>
  }, {
    linkProps: { route: "about" },
    children: <a style={linkStyle}>{i18nHelper.t('About')}</a>,
    activeStyle: { color: 'blue', },
  }, {
    linkProps: { route: "posts" },
    children: <a style={linkStyle}>{i18nHelper.t('Posts')}</a>,
    checkIsActive: ({ pathname }) => {
      return ('/post' === pathname) || ('/posts' === pathname)
    }
  },
  (props.user && props.user.username) ? {
    nolink: true,
    children: <a style={linkStyle} onClick={props.logout}>{i18nHelper.t('Logout')}</a>,
    activeStyle,
  } : {
      linkProps: { route: "login" },
      children: <a style={linkStyle}>{i18nHelper.t('Login')}</a>,
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
