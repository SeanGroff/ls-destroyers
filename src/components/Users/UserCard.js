import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'

const UserCard = ({ renderExtra, user }) => (
  <Card>
    <Card.Content>
      <Card.Header>{`${user.first_name} ${user.last_name}`}</Card.Header>
      <Card.Meta>{user.email}</Card.Meta>
      <Card.Description>{`Player: ${user.player}`}</Card.Description>
    </Card.Content>
    {renderExtra && <Card.Content>{renderExtra(user)}</Card.Content>}
  </Card>
)

UserCard.propTypes = {
  renderExtra: PropTypes.func,
  user: PropTypes.object.isRequired,
}

export default UserCard
