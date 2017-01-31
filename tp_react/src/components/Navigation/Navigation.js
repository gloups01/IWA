/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.scss';
import Link from '../Link';

class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div className={cx(s.root, this.props.className)} role="navigation">
        <Link className={s.link} to="/menu">Menu</Link>
        <Link className={s.link} to="/categories">Catégories</Link>
        <Link className={s.link} to="/lastfilms">Derniers Ajouts</Link>
        <span className={s.spacer}> | </span>
        <Link className={s.link} to="/login">Se Connecter</Link>
        <span className={s.spacer}>ou</span>
        <Link className={cx(s.link, s.highlight)} to="/register">S'enregistrer</Link>
      </div>
    );
  }

}

export default withStyles(Navigation, s);
