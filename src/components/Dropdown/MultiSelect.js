import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

const MultiSelect = ({ onChange, options, placeholder }) => {
  return (
    <Dropdown
      fluid
      multiple
      selection
      onChange={onChange}
      options={options}
      placeholder={placeholder}
    />
  )
}

MultiSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default MultiSelect
