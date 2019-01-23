import React from 'react'
import { Redirect } from '@reach/router'

import { AuthUserContext } from '../Auth'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <Component {...rest} /> : <Redirect to="/" noThrow />
    }
  </AuthUserContext.Consumer>
)

export default ProtectedRoute
