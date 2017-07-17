import React from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout.js'
import { login } from '../tools/store/user'

class Login extends React.Component {
  render() {
    const { user } = this.props
    if (user && user.username) {
      return <div>
        <h1>Login</h1>
        <p>you already login</p>
        <p>{user.username}</p>
      </div>
    }
    return <div>
      <h1>Login</h1>
      <hr />
      <label>username:</label>
      <input id="username" name="username" ref="username" />
      <br />
      <label>password:</label>
      <input id="passwd" name="passwd" type="password" ref="passwd" />
      <hr />
      <button onClick={this.handleLogin.bind(this)}>submit</button>
      <p>use test:123456 to login</p>
    </div>
  }

  handleLogin() {
    const { dispatch } = this.props
    dispatch(login(this.refs.username.value, this.refs.passwd.value))
      .catch((e) => {
        alert('登录失败:' + e)
      })
  }
}

export default Layout(connect(state => state)(Login))