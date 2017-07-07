import React from 'react'
import * as firebase from 'firebase'

import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import Home from './Home'

import {getThemeID} from '../utils/functions'
import {DEFAULT_THEME, DEFAULT_THEME_ID} from '../utils/constants'
import style from '../styles/index.css'

export default class App extends React.Component {
    constructor() {
        super()

        this.state = {
            themeId: '',
            theme: '',
            isLoggedIn: true
        }
    }

    componentWillMount() {
        //authentication
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                this.setState({isLoggedIn: false})
            } else {
                this.setState({isLoggedIn: true})
            }
        })

        //today's theme
        const todaysThemeId = getThemeID()
        firebase.database().ref(`/themes/${todaysThemeId}`).once('value').then(data => {
            if(data.exists()) {
                this.setState({
                    themeId: data.key,
                    theme: '#' + data.val()
                })
            } else {
                this.setState({
                    themeId: DEFAULT_THEME_ID,
                    theme: '#' + DEFAULT_THEME
                })
            }
        })
    }

    render() {
        const body = this.state.isLoggedIn ? <Home/> : <Login/>

        return (
            <div className={style.container}>
                <Header theme={this.state.theme}/>
                {body}
                <Footer/>
            </div>
        )
    }
}