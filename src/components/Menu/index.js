import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from '@reach/router'
import { Menu } from 'semantic-ui-react'

import { withFirebase } from '../Firebase'

class AppMenu extends PureComponent {
  state = {
    activeItem: 'dashboard',
    shouldRedirect: false,
  }

  handleItemClick = (e, { name }) => {
    this.setState(() => ({ activeItem: name }))
  }

  handleSignOutClick = () => {
    this.props.firebase.handleSignOut()
    this.setState(() => ({ shouldRedirect: true }))
  }

  render() {
    const { activeItem, shouldRedirect } = this.state

    if (shouldRedirect) {
      return <Redirect noThrow to="/" />
    }

    return (
      <Menu pointing secondary>
        <Menu.Item
          as={Link}
          to="/admin"
          name="dashboard"
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/admin/users"
          name="users"
          active={activeItem === 'users'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/admin/email"
          name="email"
          active={activeItem === 'email'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={this.handleSignOutClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

AppMenu.propTypes = {
  firebase: PropTypes.object.isRequired,
}

export default withFirebase(AppMenu)
