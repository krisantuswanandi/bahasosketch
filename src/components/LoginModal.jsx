import React from 'react'
import {connect} from 'react-redux'
import {user} from '../actions'
import logo from '../assets/images/inktoberv.png'
import Button from '../components/Button'

class Login extends React.Component {
    componentDidMount() {
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto'
    }

    render() {
        return (
            <div className="fixed inset-0 h-dvh flex justify-center items-center bg-white p-2">
                <div className="max-w-screen-sm">
                    <div>
                        <img src={logo} alt="Bahaso X Inktober"/>
                    </div>
                    <div>
                        <Button className="bg-neutral-900 font-bold w-full py-4" onClick={this.props.login}>Google Sign In</Button>
                    </div>
                    <div className="font-bold mt-3 underline text-center" onClick={this.props.onClose}>
                        Cancel
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {login: user.login})(Login)
