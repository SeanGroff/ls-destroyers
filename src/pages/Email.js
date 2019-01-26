import React, { useState } from 'react'
import { Button, Container } from 'semantic-ui-react'

import { MultiSelect } from '../components/Dropdown'
import { withFirebase } from '../components/Firebase'
import { useFetchCollection } from '../hooks'

const Email = ({ firebase }) => {
  const contacts = useFetchCollection({
    firebase,
    collection: 'users',
  })

  const [recipients, setRecipients] = useState([])

  const handleChange = (e, { value }) => {
    setRecipients(value)
  }

  const handleSend = () => {
    // @TODO Add real email logic to SendGrid
    console.log('To: ', recipients)
  }

  const contactOptions =
    contacts &&
    contacts.map(contact => ({
      ...contact,
      key: contact.email,
      text: `${contact.first_name} ${contact.last_name}`,
      value: contact.email,
    }))

  return (
    <Container>
      {contacts && (
        <>
          <MultiSelect
            onChange={handleChange}
            options={contactOptions}
            placeholder="To"
          />
          <Button
            content="Send"
            color="blue"
            disabled={!recipients || !recipients.length}
            onClick={handleSend}
          />
        </>
      )}
    </Container>
  )
}

export default withFirebase(Email)
