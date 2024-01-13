import React from 'react'
import {connect} from 'react-redux'
import {user} from '../actions'

const Logout = ({logout}) => <button className="logout-button" onClick={logout}>LOGOUT</button>

export default connect(null, {logout: user.logout})(Logout)
