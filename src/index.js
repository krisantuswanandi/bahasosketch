import React from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'

import App from './components/App'

const devConfig = {
    apiKey: "AIzaSyBy6ff_NDaYxwRK5M6rlvojzmZnfBzGfCI",
    authDomain: "fir-bahaso.firebaseapp.com",
    databaseURL: "https://fir-bahaso.firebaseio.com",
    projectId: "fir-bahaso",
    storageBucket: "fir-bahaso.appspot.com",
    messagingSenderId: "134825814680"
};

const prodConfig = {
    apiKey: 'AIzaSyBd-we3DS2sZBhExI-VdJrNyKypR_qFAEI',
    authDomain: 'bahaso-sketch.firebaseapp.com',
    databaseURL: 'https://bahaso-sketch.firebaseio.com',
    projectId: 'bahaso-sketch',
    storageBucket: 'bahaso-sketch.appspot.com',
    messagingSenderId: '267090960672'
}

firebase.initializeApp(prodConfig)

ReactDOM.render(<App/>, document.getElementById('container'))