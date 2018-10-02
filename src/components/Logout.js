import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const Logout = () => <button onClick={() => {firebase.auth().signOut()}}>LOGOUT</button>

export default Logout
