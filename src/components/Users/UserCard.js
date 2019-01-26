import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'

const UserCard = ({ user }) => {
  return (
    <Card key={user.email}>
      <Card.Content>
        <Card.Header>{`${user.first_name} ${user.last_name}`}</Card.Header>
        <Card.Meta>{user.email}</Card.Meta>
        <Card.Description>{`Player: ${user.player}`}</Card.Description>
      </Card.Content>
    </Card>
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserCard
