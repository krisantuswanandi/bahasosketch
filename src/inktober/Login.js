import React from 'react'
import * as firebase from 'firebase'

import logo from '../images/inktoberv.png'
import style from '../styles/login.css'

export default class Login extends React.Component {
    componentWillMount() {
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto'
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.loginContainer}>
                    <div>
                        <img
                            className={style.logo}
                            src={logo}
                            alt="Bahaso X Inktober"/>
                    </div>
                    <div>
                        <button
                            className={style.loginButton}
                            onClick={() => {
                                const provider = new firebase.auth.GoogleAuthProvider()

                                firebase.auth().signInWithPopup(provider).then(() => {
                                    this.props.onClose()
                                }).catch(error => {
                                    this.setState({error: error.message})
                                })
                            }}>Google Sign In</button>
                    </div>
                    <div className={style.cancel} onClick={this.props.onClose}>
                        Cancel
                    </div>
                </div>
            </div>
        )
    }
}