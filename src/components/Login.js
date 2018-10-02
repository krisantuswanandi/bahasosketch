import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

import logo from '../images/inktoberv.png'

export default class Login extends React.Component {
    componentWillMount() {
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
                        <button className="login-button"
                            onClick={() => {
                                const provider = new firebase.auth.GoogleAuthProvider()

                                firebase.auth().signInWithPopup(provider).then(() => {
                                    this.props.onClose()
                                }).catch(error => {
                                    this.setState({error: error.message})
                                })
                            }}
                        >Google Sign In</button>
                    </div>
                    <div className="cancel" onClick={this.props.onClose}>
                        Cancel
                    </div>
                </div>
            </div>
        )
    }
}
