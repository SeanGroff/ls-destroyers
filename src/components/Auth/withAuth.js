import React from 'react'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null,
    }

    componentDidMount() {
      const { firebase } = this.props
      this.unsubscribe = firebase.auth.onAuthStateChanged(async authUser => {
        if (authUser) {
          const { claims } = await authUser.getIdTokenResult()
          authUser && claims.admin
            ? this.setState({ authUser: { ...authUser, admin: claims.admin } })
            : this.setState({ authUser: null })
        } else {
          this.setState({ authUser: null })
        }
      })
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication)
}

export default withAuthentication
