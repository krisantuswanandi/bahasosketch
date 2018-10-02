import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import './style.css'

import registerFirebase from './registerFirebase'
import registerServiceWorker from './registerServiceWorker'

registerFirebase(true)
registerServiceWorker()

ReactDOM.render(<App/>, document.getElementById('root'))
