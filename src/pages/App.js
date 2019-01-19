import React from 'react'
import { Router } from '@reach/router'

import Login from './Login'
import Dashboard from './Dashboard'

const App = () => (
  <Router className="full-height">
    <Login path="/" />
    <Dashboard path="dashboard" />
  </Router>
)

export default App
