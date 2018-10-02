import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

import style from '../../styles/form.css'

export default class LoginForm extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    onInputChange({target: {type, value}}) {
        this.setState({
            [type]: value
        })
    }

    onLoginClick(event) {
        event.preventDefault()

        const {email, password} = this.state

        if(!email) {
            this.setState({error: 'Email cannot be empty'})
        } else if(!password) {
            this.setState({error: 'Password cannot be empty'})
        } else if(password.length < 6) {
            this.setState({error: 'Password cannot be less than 6 characters'})
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
                if(error.code === 'auth/user-not-found') {
                    firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
                        this.setState({error: error.message})
                    });
                } else {
                    this.setState({error: error.message})
                }
            })
        }
    }

    onGoogleLoginClick() {
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider).catch(error => {
            this.setState({error: error.message})
        })
    }

    render() {
        return (
            <div className={style.formContainer}>
                <div className={style.formInputContainer}>
                    <button className={`${style.btn} ${style.btnBlock} ${style.btnGoogle}`} onClick={this.onGoogleLoginClick.bind(this)}>Google Sign In</button>
                </div>
                <div className={style.formInputSeparator}>or</div>
                <form onSubmit={this.onLoginClick.bind(this)}>
                    <div className={style.formInputContainer}>
                        <input className={style.formControl} type="email" onChange={this.onInputChange.bind(this)} value={this.state.email} placeholder="Email"/>
                    </div>
                    <div className={style.formInputContainer}>
                        <input className={style.formControl} type="password" onChange={this.onInputChange.bind(this)} value={this.state.password} placeholder="Password (more than 6 characters)"/>
                    </div>
                    <div className={style.formInputError}>{this.state.error}</div>
                    <div className={style.formInputContainer}>
                        <button className={`${style.btn} ${style.btnBlock} ${style.btnPrimary}`} type="submit">LOGIN / REGISTER</button>
                    </div>
                </form>
            </div>
        )
    }
}