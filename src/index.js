import React from 'react'
import ReactDOM from 'react-dom'

import Root from './Root'
import './assets/styles/style.css'

import registerServiceWorker from './registerServiceWorker'

registerServiceWorker()

ReactDOM.render(<Root/>, document.getElementById('root'))
