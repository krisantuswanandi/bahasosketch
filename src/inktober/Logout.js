import React from 'react'
import * as firebase from 'firebase'

export default () => <button onClick={() => {firebase.auth().signOut()}}>LOGOUT</button>