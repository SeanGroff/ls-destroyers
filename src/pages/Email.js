import React, { useState } from 'react'
import { Container, Form } from 'semantic-ui-react'

import { withFirebase } from '../components/Firebase'
import { useFetchCollection } from '../hooks'

const Email = ({ firebase }) => {
  const contacts = useFetchCollection({
    firebase,
    collection: 'users',
  })

  const [recipients, setRecipients] = useState([])
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const handleSendEmail = () => {
    // @TODO Add real email logic to SendGrid
    console.log('To: ', recipients)
    console.log('Subject: ', subject)
    console.log('Body: ', body)
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
        <Form>
          <Form.Dropdown
            fluid
            multiple
            selection
            placeholder="To"
            options={contactOptions}
            onChange={(e, { value }) => {
              setRecipients(value)
            }}
          />
          <Form.Input
            type="text"
            fluid
            placeholder="Subject"
            onChange={e => {
              setSubject(e.target.value)
            }}
          />
          <Form.TextArea
            type="text"
            autoHeight
            style={{ minHeight: 200 }}
            onChange={e => {
              setBody(e.target.value)
            }}
          />
          <Form.Button
            type="submit"
            content="Send"
            color="blue"
            disabled={!recipients || !recipients.length}
            onClick={handleSendEmail}
          />
        </Form>
      )}
    </Container>
  )
}

export default withFirebase(Email)
