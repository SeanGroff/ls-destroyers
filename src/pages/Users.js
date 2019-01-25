import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Card,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react'

import { NewUserModal } from '../components/Users'
import { withFirebase } from '../components/Firebase'

const Users = ({ firebase }) => {
  const [isOpen, setOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const unsubscribe = firebase.db.collection('users').onSnapshot(
      snapshot => {
        const usersCollection = snapshot.docs.map(doc => doc.data())
        setUsers([...users, ...usersCollection])
      },
      err => {
        setErrorMessage(err.message)
      }
    )
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Container>
      {!!errorMessage && (
        <Message
          onDismiss={() => setErrorMessage('')}
          header="Error!"
          content={errorMessage}
        />
      )}
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
