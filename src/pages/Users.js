import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Icon, Segment } from 'semantic-ui-react'

import { NewUserModal, UsersCardList } from '../components/Users'
import { withFirebase } from '../components/Firebase'

const Users = ({ firebase }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Container>
      <UsersCardList />
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
