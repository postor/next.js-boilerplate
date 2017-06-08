import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import Router from 'next/router'

import Header from './Header'
import fetch from './fetch'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

export default (Page)=>class Layout extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {
      user:{
        isGuest: true,
      }
    }
  }

  static propTypes = {
    children: PropTypes.any
  }


  static async getInitialProps ({ req }) {
    var user = await fetch('https://localhost:3000/auth',{},req)
    if(user.error){
      user.isGuest = true
    }
    return {user}
  }

  render(){
    return <div style={layoutStyle}>
      <Header user={this.props.user}/>
      <Page />
    </div>
  } 
}


