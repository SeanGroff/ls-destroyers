import React, { Component } from 'react'

import AppMenu from '../components/Menu'
import { withFirebase } from '../components/Firebase'

class Dashboard extends Component {
  render() {
    const { firebase } = this.props
    return (
      <div>
        <AppMenu onSignOut={firebase.handleSignOut} />
        <h1>Dashboard</h1>
      </div>
    )
  }
}

export default withFirebase(Dashboard)
