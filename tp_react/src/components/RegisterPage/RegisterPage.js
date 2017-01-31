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
import s from './RegisterPage.scss';

import { Button, Input, Form } from 'semantic-ui-react'

const title = 'New User Registration';

class RegisterPage extends Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }


  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>

        </div>
      </div>
    );
  }

}

export default withStyles(RegisterPage, s);
