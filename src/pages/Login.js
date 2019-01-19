import React, { PureComponent } from 'react'
import { Redirect } from '@reach/router'
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react'

import ButtonLink from '../components/ButtonLink'
import { withFirebase } from '../components/Firebase'

const INITIAL_STATE = {
  isLogin: true,
  isLoading: false,
  errorMessage: '',
  email: '',
  password: '',
  confirm: '',
  shouldRedirect: false,
}

class Login extends PureComponent {
  state = INITIAL_STATE

  handleChange = event => {
    const { target } = event
    this.setState(() => ({
      [target.name]: target.value,
      errorMessage: '',
    }))
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { isLogin, email, password } = this.state
    const { firebase } = this.props
    const authenticate = isLogin
      ? firebase.handleSignInWithEmailAndPassword
      : firebase.handleCreateUserWithEmailAndPassword

    this.setState(() => ({ isLoading: true }))

    const user = await authenticate(email, password).catch(err => {
      this.setState(() => ({ isLoading: false, errorMessage: err.message }))
    })

    if (user) {
      this.setState(() => ({ shouldRedirect: true }))
    }

    this.setState(() => ({ isLoading: false }))
  }

  toggleLogin = () => {
    this.setState(prevState => ({
      ...INITIAL_STATE,
      isLogin: !prevState.isLogin,
    }))
  }

  formValidation = () => {
    const { isLogin, email, password, confirm } = this.state
    if (isLogin && email.length && password.length) {
      return true
    }
    if (
      !isLogin &&
      email.length &&
      password.length &&
      confirm.length &&
      password === confirm
    ) {
      return true
    }
    return false
  }

  renderDescription = () => {
    const { isLogin } = this.state
    const text = isLogin ? 'Not registered yet?' : 'Already have an account?'
    const linkText = isLogin ? 'Sign up' : 'Login'
    return (
      <Message>
        {`${text} `}
        <ButtonLink onClick={this.toggleLogin}>{linkText}</ButtonLink>
      </Message>
    )
  }

  render() {
    const {
      isLoading,
      isLogin,
      email,
      password,
      confirm,
      errorMessage,
      shouldRedirect,
    } = this.state
    const isValid = this.formValidation()
    if (shouldRedirect) {
      return <Redirect noThrow to="dashboard" />
    }
    return (
      <Container className="full-height center aligned middle aligned grid">
        <Grid centered columns={3}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              LS Destroyers
            </Header>
            <Segment>
              <Form
                error={!!errorMessage}
                loading={!!isLoading}
                onSubmit={this.handleSubmit}
                size="large"
              >
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Email address"
                  value={email}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Password"
                  type="password"
                  value={password}
                />
                {!isLogin && (
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    name="confirm"
                    onChange={this.handleChange}
                    placeholder="Confirm password"
                    type="password"
                    value={confirm}
                  />
                )}
                <Button color="blue" disabled={!isValid} fluid size="large">
                  {isLogin ? 'Login' : 'Sign up'}
                </Button>
                {!!errorMessage && <Message error content={errorMessage} />}
              </Form>
            </Segment>
            {this.renderDescription()}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
export default withFirebase(Login)
