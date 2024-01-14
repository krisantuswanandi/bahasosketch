import React from 'react'
import {connect} from 'react-redux'

import Header from './components/Header'
import Upload from './components/Upload'
import LoginModal from './components/LoginModal'
import Logout from './components/Logout'
import Gallery from './components/Gallery'
import Button from './components/Button'

import {user} from './actions'

class App extends React.Component {
    state = {
        isLoginOpen: false
    }

    componentDidMount() {
        this.props.onAuth()
    }

    openLogin() {
        this.setState({isLoginOpen: true})
    }

    closeLogin() {
        this.setState({isLoginOpen: false})
    }

    render() {
        return (
            <div className="m-auto max-w-screen-lg p-2">
                <Header/>
                <Gallery/>
                {this.props.isLoggedIn && <Upload/>}
                {this.state.isLoginOpen && <LoginModal onClose={this.closeLogin.bind(this)}/>}
                {this.props.isLoggedIn ? <Logout/> : <div>
                    <Button className="rounded-full fixed right-10 bottom-10 w-16 h-16 text-4xl leading-none" onClick={this.openLogin.bind(this)}>+</Button>
                </div>}
            </div>
        )
    }
}

export default connect(({user}) => ({
    isLoggedIn: !!user.uid
}), {onAuth: user.onAuth})(App)
