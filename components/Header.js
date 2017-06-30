
import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types'
import getNavigation from 'next-navigation'

import { default as routes, Link } from '../tools/routes'
import i18nHelper from '../tools/i18n-helper'
import { getRegister } from '../tools/store/'

const MyNav = getNavigation(routes)
const translateNS = ['common']

class Header extends React.Component {

  handleChangeLanguage(e) {
    i18nHelper.setCurrentLanguage(e.target.value);
  }

  render() {
    const { url, t } = this.props

    var tprops = {
      ulProps: {
        className: 'mynav',
      },
      links: this.getLinks(t),
      activeStyle: {},
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

  getLinks(t) {
    var that = this
    var { user, logout } = this.props
    return [{
      linkProps: { route: "index" },
      children: <a >{t('Home')}</a>,
    }, {
      linkProps: { route: "about" },
      children: <a >{t('About')}</a>,
      activeStyle: { color: 'blue', },
    }, {
      linkProps: { route: "posts" },
      children: <a >{t('Posts')}</a>,
      checkIsActive: ({ pathname }) => {
        return ('/post' === pathname) || ('/posts' === pathname)
      }
    },
    (user && user.username) ? {
      nolink: true,
      children: <a onClick={logout}>{t('Logout')}</a>,
    } : {
        linkProps: { route: "login" },
        children: <a >{t('Login')}</a>,
      }, {
      nolink: true,
      children: (<select value={i18nHelper.getCurrentLanguage()} onChange={that.handleChangeLanguage.bind(that)}>
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>),
    }]
  }

  static async getInitialProps() {
    return Promise.resolve({ translateNS })
  }
}

export default translate(translateNS)(Header)
