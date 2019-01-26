import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react'
import { withFirebase } from '../Firebase'

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  player: '',
}

const formReducer = (state, { name, value }) =>
  !name ? initialFormState : { ...state, [name]: value }

const NewUserModal = ({ firebase, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [state, dispatch] = useReducer(formReducer, initialFormState)
  const { firstName, lastName, email, phone, player } = state

  const handleChange = event => {
    const { target } = event
    const name = target.name ? target.name : target.id
    dispatch({ name, value: target.value })
  }

  const handleClose = () => {
    dispatch(initialFormState)
    onClose()
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    try {
      await firebase.db.collection('users').add({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: Number(phone),
        player,
      })
      setLoading(false)
      onClose()
    } catch (err) {
      setLoading(false)
      setErrorMessage(err.message)
    }
  }

  return (
    <Modal closeIcon open={isOpen} onClose={onClose}>
      <Header icon="user plus" content="Create New User" />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="firstName"
              label="First name"
              placeholder="First name"
              value={firstName}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              id="lastName"
              label="Last name"
              placeholder="Last name"
              value={lastName}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              id="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              id="phone"
              label="Phone Number"
              placeholder="Phone Number"
              value={phone}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              id="player"
              label="Player Name"
              placeholder="Player Name"
              value={player}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        {!!errorMessage && <Message error content={errorMessage} />}
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleClose}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" loading={loading} onClick={handleSubmit}>
          <Icon name="checkmark" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

NewUserModal.propTypes = {
  firebase: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

NewUserModal.defaultProps = {
  isOpen: false,
}

export default withFirebase(NewUserModal)
