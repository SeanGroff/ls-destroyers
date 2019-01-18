import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

import './styles.css'

const ButtonLink = ({ children, onClick }) => {
  return (
    <Button basic color="blue" className="link no-padding" onClick={onClick}>
      {children}
    </Button>
  )
}

ButtonLink.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ButtonLink
