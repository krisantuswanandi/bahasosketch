import React from 'react'
import {connect} from 'react-redux'
import {user} from '../actions'
import logo from '../assets/images/inktoberv.png'

class Login extends React.Component {
    componentDidMount() {
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto'
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div>
                        <img className="logo" src={logo} alt="Bahaso X Inktober"/>
                    </div>
                    <div>
                        <button className="login-button" onClick={this.props.login}>Google Sign In</button>
                    </div>
                    <div className="cancel" onClick={this.props.onClose}>
                        Cancel
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {login: user.login})(Login)
