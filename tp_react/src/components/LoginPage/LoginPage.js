/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginPage.scss';
import AuthService from '../../services/authentification';
import { Button, Input, Form } from 'semantic-ui-react'

const title = 'Log In';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      password: ""
    };
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login(e) {
    e.preventDefault();

    AuthService.login(this.state.user, this.state.password, (loggedIn) => {
      localStorage.setItem("user", this.state.user);
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }
    })
  }


  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <Form>
            <Form.Field>
              <Input type="text" name="user" value={this.state.user}
                     placeholder="Username"
                     onChange={this.handleChange.bind(this)}/>
            </Form.Field>
            <Form.Field>
              <Input type="password" name="password" value={this.state.password}
                     placeholder="Password"
                     onChange={this.handleChange.bind(this)}/>
            </Form.Field>
            <Button type="submit" onClick={this.login.bind(this)}>Submit</Button>
          </Form>
          <p>Welcome {localStorage.getItem('user')}</p>
        </div>
      </div>
    );
  }

}

export default withStyles(LoginPage, s);
