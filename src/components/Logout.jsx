import React from 'react'
import {connect} from 'react-redux'
import {user} from '../actions'

const Logout = ({logout}) => <button className="block tracking-widest my-12 mx-auto font-bold max-w-24" onClick={logout}>LOGOUT</button>

export default connect(null, {logout: user.logout})(Logout)
