import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Card, Icon, Segment } from 'semantic-ui-react'

import { NewUserModal } from '../components/Users'
import { withFirebase } from '../components/Firebase'
import useFetchCollection from '../hooks/useFetchCollection'

const Users = ({ firebase }) => {
  const [isOpen, setOpen] = useState(false)
  const users = useFetchCollection({ firebase, collection: 'users' })
  return (
    <Container>
      <Card.Group>
        {users &&
          users.map(user => (
            <Card key={user.email}>
              <Card.Content>
                <Card.Header>{`${user.first_name} ${
                  user.last_name
                }`}</Card.Header>
                <Card.Meta>{user.email}</Card.Meta>
                <Card.Description>{`Player: ${user.player}`}</Card.Description>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
      <Segment>
        <Container textAlign="center">
          <Button color="blue" onClick={() => setOpen(true)}>
            <Icon name="plus" />
            Add New User
          </Button>
        </Container>
      </Segment>
      <NewUserModal isOpen={isOpen} onClose={() => setOpen(false)} />
    </Container>
  )
}

Users.propTypes = {
  firebase: PropTypes.object.isRequired,
}

export default withFirebase(Users)
