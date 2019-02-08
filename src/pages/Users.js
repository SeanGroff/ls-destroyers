import React, { useState } from 'react'
import { Button, Container, Segment } from 'semantic-ui-react'

import { NewUserModal, UsersCardList } from '../components/Users'

const Users = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Container>
      <UsersCardList />
      <Segment>
        <Container textAlign="center">
          <Button
            content="Add New User"
            color="blue"
            icon="plus"
            onClick={() => setOpen(true)}
          />
        </Container>
      </Segment>
      <NewUserModal isOpen={isOpen} onClose={() => setOpen(false)} />
    </Container>
  )
}

export default Users
