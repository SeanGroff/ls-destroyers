import React, { useState } from 'react'
import { Container, Form, Message } from 'semantic-ui-react'
import axios from 'axios'

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
  const [message, setMessage] = useState('')
  const [isError, setError] = useState(false)

  const handleSendEmail = async () => {
    try {
      setError(false)

      const { data } = await axios({
        method: 'post',
        headers: { 'content-type': 'application/json' },
        url: `${process.env.REACT_APP_FUNCTIONS_URL}/sendEmail`,
        data: {
          to: recipients,
          subject,
          text: body,
        },
      })

      setMessage(data.message)
    } catch (err) {
      setError(true)
      setMessage(err.message)
    }
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
      {message && (
        <Message
          negative={isError}
          success={!isError}
          header={isError ? 'Error' : 'Success'}
          content={message}
        />
      )}
    </Container>
  )
}

export default withFirebase(Email)
