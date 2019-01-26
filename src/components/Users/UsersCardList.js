import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Message } from 'semantic-ui-react'

import UserCard from './UserCard'
import { withFirebase } from '../Firebase'

const UsersCardList = ({ firebase }) => {
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
    <Card.Group>
      {users && users.map(user => <UserCard key={user.email} user={user} />)}
    </Card.Group>
  )
}

UsersCardList.propTypes = {
  firebase: PropTypes.object.isRequired,
}

export default withFirebase(UsersCardList)
