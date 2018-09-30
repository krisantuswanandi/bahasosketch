import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

export default () => <button onClick={() => {firebase.auth().signOut()}}>LOGOUT</button>