import React from 'react'
import * as firebase from 'firebase'

import Header from './Header'
import Footer from './Footer'
import Upload from './Upload'
import Login from './Login'
import Gallery from './Gallery'

import style from '../styles/index.css'

export default class App extends React.Component {
    constructor() {
        super()

        this.state = {
            isLoggedIn: false,
            isLoginOpen: false
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                this.setState({isLoggedIn: false})
            } else {
                this.setState({isLoggedIn: true})
            }
        })
    }

    openLogin() {
        this.setState({isLoginOpen: true})
    }

    closeLogin() {
        this.setState({isLoginOpen: false})
    }

    render() {
        return (
            <div className={style.container}>
                <Header/>
                <Gallery/>
                {/* <Upload canUpload={this.state.isLoggedIn} onClick={this.openLogin.bind(this)}/>
                {this.state.isLoginOpen && <Login onClose={this.closeLogin.bind(this)}/>} */}
            </div>
        )
    }
}