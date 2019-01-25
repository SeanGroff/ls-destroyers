import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react'
import { withFirebase } from '../Firebase'

const initialFormState = {
  loading: false,
  errorMessage: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  player: '',
}

const reducer = (state, action) => {
  const { errorMessage, firstName, lastName, email, phone, player } = action
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return { ...state, loading: !state.loading }
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage }
    case 'UPDATE_FIRST_NAME':
      return { ...state, firstName }
    case 'UPDATE_LAST_NAME':
      return { ...state, lastName }
    case 'UPDATE_EMAIL':
      return { ...state, email }
    case 'UPDATE_PHONE':
      return { ...state, phone }
    case 'UPDATE_PLAYER':
      return { ...state, player }
    case 'RESET':
      return initialFormState
    default:
      return state
  }
}

const NewUserModal = ({ firebase, isOpen, onClose }) => {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const {
    errorMessage,
    loading,
    firstName,
    lastName,
    email,
    phone,
    player,
  } = state

  const handleClose = () => {
    dispatch({ type: 'RESET' })
    onClose()
  }

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch({ type: 'TOGGLE_LOADING' })

    try {
      await firebase.db.collection('users').add({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: Number(phone),
        player,
      })
      dispatch({ type: 'TOGGLE_LOADING' })
      onClose()
    } catch (err) {
      dispatch({ type: 'TOGGLE_LOADING' })
      dispatch({ type: 'SET_ERROR_MESSAGE', errorMessage: err.message })
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
              onChange={e =>
                dispatch({
                  type: 'UPDATE_FIRST_NAME',
                  firstName: e.target.value,
                })
              }
            />
            <Form.Input
              fluid
              id="lastName"
              label="Last name"
              placeholder="Last name"
              value={lastName}
              onChange={e =>
                dispatch({
                  type: 'UPDATE_LAST_NAME',
                  lastName: e.target.value,
                })
              }
            />
            <Form.Input
              fluid
              id="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={e =>
                dispatch({
                  type: 'UPDATE_EMAIL',
                  email: e.target.value,
                })
              }
            />
            <Form.Input
              fluid
              id="phone"
              label="Phone Number"
              placeholder="Phone Number"
              value={phone}
              onChange={e =>
                dispatch({
                  type: 'UPDATE_PHONE',
                  phone: e.target.value,
                })
              }
            />
            <Form.Input
              fluid
              id="player"
              label="Player Name"
              placeholder="Player Name"
              value={player}
              onChange={e =>
                dispatch({
                  type: 'UPDATE_PLAYER',
                  player: e.target.value,
                })
              }
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
