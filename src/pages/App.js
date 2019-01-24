import React, { Fragment } from 'react'
import { Router } from '@reach/router'

import ProtectedRoute from '../components/ProtectedRoute'
import AppMenu from '../components/Menu'
import Login from './Login'
import Dashboard from './Dashboard'
import Email from './Email'
import NotFound from './NotFound'
import { withAuth } from '../components/Auth'

const LoginContainer = () => {
  return <Login path="/" />
}

const ProtectedContainer = () => {
  return (
    <Fragment>
      <AppMenu />
      <Router>
        <ProtectedRoute path="/" component={Dashboard} />
        <ProtectedRoute path="email" component={Email} />
      </Router>
    </Fragment>
  )
}

const App = () => (
  <Router className="full-height">
    <LoginContainer path="/" component={LoginContainer} />
    <ProtectedContainer path="admin/*" component={ProtectedContainer} />
    <NotFound default />
  </Router>
)

export default withAuth(App)
