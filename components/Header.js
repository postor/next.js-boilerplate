
import React from 'react'
import { translate } from 'react-i18next'
import getNavigation from 'next-navigation'
import { connect } from 'react-redux'

import { default as routes } from '../tools/routes'
import i18nHelper from '../tools/i18n-helper'
import { getUser, logout} from '../tools/store/user'
import { getContextedFetch } from '../tools/fetch'

const MyNav = getNavigation(routes)

class Header extends React.Component {

  handleChangeLanguage(e) {
    i18nHelper.setCurrentLanguage(e.target.value)
  }

  handleLogout(){
    var {dispatch} = this.props
    dispatch(logout())
  }

  render() {
    const { url, t, user } = this.props

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
      <p>{JSON.stringify(user)}</p>
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
    var { user} = this.props
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
      children: <a onClick={this.handleLogout.bind(this)}>{t('Logout')}</a>,
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



  static translateNS = ['common']
  static async getInitialProps(ctx) {
    const { store } = ctx
    return await store.dispatch(getUser(getContextedFetch(ctx),store))
    .catch(()=>{
    })
  }
}

export default connect(state => state)(translate(Header.translateNS)(Header))
