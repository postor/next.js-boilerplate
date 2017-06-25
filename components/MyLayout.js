import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import Router from 'next/router'

import Header from './Header'
import fetch from '../tools/fetch'
import apiUrls from '../tools/api-urls'
import i18nHelper from '../tools/i18n-helper'
import getTranslation from '../tools/get-translation'

import { I18nextProvider } from 'react-i18next'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

export default (Page)=>class Layout extends React.Component {  
  constructor(props) {
    super(props)
    this.i18n = i18nHelper.getI18n(props.translations)
  }

  static propTypes = {
    children: PropTypes.any,
    user: PropTypes.object,
  }


  static async getInitialProps (ctx) {
    var myProp = await getMyProps(ctx)
    var pageProp = Page.getInitialProps?await Page.getInitialProps(ctx):{}

    var translations = await getTranslation(
      i18nHelper.getCurrentLanguage(ctx.req),
      pageProp.translateNS?pageProp.translateNS:['common'],
      ctx.req
    )
    return {
      ...myProp,
      ...pageProp,
      translations
    }

    async function getMyProps (ctx){
      const { req, res } = ctx
      var user = req?req.cookies.user:Cookies.get('user')
      if(user){
        user = JSON.parse(user)
        user.isGuest = false            
        return { user,}
      }else{
        return {
          user: {isGuest: true},
        }    
      } 
    }
  }

  

  render(){
    var props = {
        login: this.handleLogin.bind(this),
        logout: this.handleLogout.bind(this),
        ...this.props,
        ...this.state
    }
    return <I18nextProvider i18n={this.i18n}>
      <div style={layoutStyle}>
        <Header {...props} />
        <Page {...props} />
      </div>
    </I18nextProvider>
  } 

  handleLogin(username,passwd){
    var form = JSON.stringify({username,passwd})
    
    fetch(apiUrls('/auth'),{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: form
    })
    .then(r=>r.json())
    .then((user)=>{
      if(user.error){
        return Promise.reject(user.error)
      }
      return user
    })
    .then((user)=>{      
      user.isGuest = false
      this.setState({user})
      Router.push('/')
    })
    .catch((err)=>{
      console.log(err)
      alert(err)
    })    
  }

  handleLogout(){      
    this.setState({user:{
      isGuest: true,
    }})
    Cookies.remove('user')
    Router.push('/')
  }
}


