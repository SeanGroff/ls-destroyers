import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react'

const NewUserModal = ({ isOpen, onClose }) => {
  return (
    <Modal closeIcon open={isOpen} onClose={onClose}>
      <Header icon="user plus" content="Create New User" />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="first_name"
              label="First name"
              placeholder="First name"
            />
            <Form.Input
              fluid
              id="last_name"
              label="Last name"
              placeholder="Last name"
            />
            <Form.Input fluid id="email" label="Email" placeholder="Email" />
            <Form.Input
              fluid
              id="phone"
              label="Phone Number"
              placeholder="Phone Number"
            />
            <Form.Input
              fluid
              id="player"
              label="Player Name"
              placeholder="Player Name"
            />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red">
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green">
          <Icon name="checkmark" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

NewUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

NewUserModal.defaultProps = {
  isOpen: false,
}

export default NewUserModal
