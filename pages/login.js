import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/MyLayout.js'

class Login extends React.Component {
    static contextTypes = {
        user: PropTypes.any
    }

    render() {
        const context = this.context || window.mycontext
        const {user} = context
        if(user && !user.isGuest){
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
            <button onClick={this.handleLogin}>submit</button>
        </div>
    }

    handleLogin(){
        this.context.user.login(this.refs.username.nodeValue, this.refs.passwd.nodeValue)
    }
}



export default Layout(Login)