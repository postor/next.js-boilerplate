
import React from 'react';
import { translate } from 'react-i18next';
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

class Header extends React.Component {

  handleChangeLanguage(e){
    i18nHelper.setCurrentLanguage(e.target.value);
  }

  render(){
    const { url, t } = this.props

    var tprops = {
      ulProps: {
        className: 'mynav',
      },
      links: this.getLinks(t),
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

  getLinks(t){
    var that = this
    var {user, logout} = this.props
    return [{
      linkProps: { route: "index" },
      children: <a style={linkStyle}>{t('Home')}</a>,
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
    (user && user.username) ? {
      nolink: true,
      children: <a style={linkStyle} onClick={logout}>{t('Logout')}</a>,
    } : {
      linkProps: { route: "login" },
      children: <a style={linkStyle}>{t('Login')}</a>,
    }, {
      nolink: true,
      children: (<select value={i18nHelper.getCurrentLanguage()} onChange={that.handleChangeLanguage.bind(that)}>
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>),
    }]
  }

  
}

export default translate(['common'])(Header)
