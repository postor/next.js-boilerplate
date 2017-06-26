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
  const t = i18nHelper.getFixedT('common')
  var { url } = props

  var tprops = {
    ulProps: {
      className: 'mynav',
    },
    links: getLinks(),
    activeStyle,
    activeClassName: 'on',
    url,
  }

  function handleChangeLanguage(e){
    i18nHelper.setCurrentLanguage(e.target.value)
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

  function getLinks(){
    return [{
      linkProps: { route: "index" },
      children: <a style={linkStyle}>{t('Home')}</a>, //translate((props)=>(<a style={linkStyle}>{props.t('Home')}</a>
    }, {
      linkProps: { route: "about" },
      children: <a style={linkStyle}>{t('About')}</a>,
      activeStyle: { color: 'blue', },
    }, {
      linkProps: { route: "posts" },
      children: <a style={linkStyle}>{t('Posts')}</a>,
      checkIsActive: ({ pathname }) => {
        return ('/post' === pathname) || ('/posts' === pathname)
      }
    },
    (props.user && props.user.username) ? {
      nolink: true,
      children: <a style={linkStyle} onClick={props.logout}>{t('Logout')}</a>,
    } : {
      linkProps: { route: "login" },
      children: <a style={linkStyle}>{t('Login')}</a>,
    }, {
      nolink: true,
      children: (<select value={i18nHelper.getCurrentLanguage()} onChange={handleChangeLanguage}>
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>),
    }]
  }

  
}

export default Header
