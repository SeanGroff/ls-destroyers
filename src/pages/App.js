import React from 'react'
import { Router } from '@reach/router'

import ProtectedRoute from '../components/ProtectedRoute'
import Login from './Login'
import Dashboard from './Dashboard'
import NotFound from './NotFound'
import { withAuth } from '../components/Auth'

const App = () => (
  <Router className="full-height">
    <Login path="/" />
    <ProtectedRoute path="dashboard" component={Dashboard} />
    <NotFound default />
  </Router>
)

export default withAuth(App)
