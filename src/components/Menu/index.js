import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'

class AppMenu extends PureComponent {
  state = {
    activeItem: 'dashboard',
  }

  handleItemClick = (e, { name }) => {
    this.setState(() => ({ activeItem: name }))
  }

  render() {
    const { onSignOut } = this.props
    const { activeItem } = this.state
    return (
      <Menu pointing secondary>
        <Menu.Item
          name="dashboard"
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={onSignOut}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

AppMenu.propTypes = {
  onSignOut: PropTypes.func.isRequired,
}

export default AppMenu
