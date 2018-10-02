import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import registerFirebase from './registerFirebase'
import registerServiceWorker from './registerServiceWorker'

registerFirebase()
registerServiceWorker()

ReactDOM.render(<App/>, document.getElementById('root'))
