import React from 'react'
import { Container, List } from 'semantic-ui-react'

import { withFirebase } from '../components/Firebase'
import { useFetchCollection } from '../hooks'

const Email = ({ firebase }) => {
  const contacts = useFetchCollection({
    firebase,
    collection: 'users',
  })
  return (
    <Container>
      <List animated selection horizontal>
        {contacts &&
          contacts.map(contact => (
            <List.Item key={contact.email}>
              <List.Content>
                <List.Header as="a">{`${contact.first_name} ${
                  contact.last_name
                }`}</List.Header>
                <List.Description>
                  {`Player: ${contact.player}`}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </Container>
  )
}

export default withFirebase(Email)
