import React, { PureComponent } from 'react'
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

class Login extends PureComponent {
  state = {
    isLogin: true,
  }

  toggleLogin = () => {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin,
    }))
  }

  renderMessage = () => {
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
    const { isLogin } = this.state
    return (
      <Container className="full-height center aligned middle aligned grid">
        <Grid centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              LS Destroyers
            </Header>
            <Segment>
              <Form size="large">
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Email address"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                {!isLogin && (
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Confirm password"
                    type="password"
                  />
                )}
                <Button color="blue" fluid size="large">
                  {isLogin ? 'Login' : 'Sign up'}
                </Button>
              </Form>
            </Segment>
            {this.renderMessage()}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
export default Login
