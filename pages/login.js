import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/MyLayout.js'
import fetch from '../components/fetch'

class Login extends React.Component {
    
    static propTypes = {
        user: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
    }

    render() {
        const {user} = this.props
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
            <button onClick={this.handleLogin.bind(this)}>submit</button>
        </div>
    }

    handleLogin(){
        this.props.login(this.refs.username.value, this.refs.passwd.value)
    }

    static async getInitialProps({req,res}){
        console.log('see?')
        return await fetch('http://localhost/auth', {}, req, res)
        .then(r=>r.json())
        .then((user)=>{
            return {loginuser:user}
        })
    }
}



export default Layout(Login)