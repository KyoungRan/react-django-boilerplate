import React, {Component} from 'react'
import {render} from 'react-dom'

// import components
import App from './components/App'
import Home from './components/Home'

// import react router deps
import {Route, IndexRoute, Router, browserHistory} from 'react-router'
//import {Provider} from 'react-redux'


render(<Home />, document.getElementById('root'))
