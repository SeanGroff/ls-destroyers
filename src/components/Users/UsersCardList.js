import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Message } from 'semantic-ui-react'
import { SemanticToastContainer } from 'react-semantic-toasts'
import 'react-semantic-toasts/styles/react-semantic-alert.css'

import UserCard from './UserCard'
import { withFirebase } from '../Firebase'
import { setToast } from '../../utils'

const UsersCardList = ({ firebase }) => {
  const handleEditUserClick = async user => {
    try {
      const { data } = await firebase.handleMakeAdmin(user)
      const toastConfig = {
        title: data.error ? 'Failure' : 'Success',
        description: data.error ? data.error : data.message,
        type: data.error ? 'error' : 'success',
      }

      setToast(toastConfig)
    } catch (err) {
      setToast({
        title: 'Failure',
        description: 'Uh-oh! Internal server error',
        type: 'error',
      })
    }
  }
  const renderExtra = user => (
    <Fragment>
      <Button
        color="teal"
        icon="write"
        size="mini"
        onClick={() => handleEditUserClick(user)}
      />
      <SemanticToastContainer position="top-right" />
    </Fragment>
  )
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

  return !!errorMessage ? (
    <Message
      onDismiss={() => setErrorMessage('')}
      header="Error!"
      content={errorMessage}
    />
  ) : (
    <Card.Group style={{ overflow: 'auto', maxHeight: '80vh' }}>
      {users &&
        users.map(user => (
          <UserCard key={user.email} user={user} renderExtra={renderExtra} />
        ))}
    </Card.Group>
  )
}

UsersCardList.propTypes = {
  firebase: PropTypes.object.isRequired,
}

export default withFirebase(UsersCardList)
