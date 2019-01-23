import React, { Component } from 'react'

import AppMenu from '../components/Menu'
import { withFirebase } from '../components/Firebase'

class Dashboard extends Component {
  state = {
    users: null,
  }

  async componentDidMount() {
    const { docs } = await this.props.firebase.db
      .collection('users')
      .get()
      .catch(err => {
        this.setState(() => ({ users: null }))
      })

    const users = docs.map(doc => doc.data())
    this.setState(() => ({ users }))
  }
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
