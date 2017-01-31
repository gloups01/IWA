/**
 * Created by glo_0 on 18/01/2017.
 */
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Link from '../Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Menu.scss';
var {Image, Grid, Icon,Container, Label, Button,Search} = require('semantic-ui-react');

const title = 'Menu';
var id;

class Menu extends Component {

  constructor(props) {
    super();
    this.state= { isLoading: false, results: [], value: '' };
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
    this.resetComponent.bind(this);
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, result) => {
    this.setState({ value: result.name||result.title })
    id = JSON.stringify(result);
  }

  handleSearchChange = (e, value) => {
    var source;
    var url = 'https://api.themoviedb.org/3/search/multi?api_key=92f9fd9a64e4fc0fb9e735d9e7b42c93&language=fr&query='+value+'&include_adult=false';

    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function(data) {
      source =  data.results;

    }.bind(this) );

    this.setState({ isLoading: true, value });


    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.name+result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }

  render() {

    const { isLoading, value, results } = this.state;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <Grid>
            <Grid.Column width={3}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            placeholder="Chercher"
           {...this.props}
          />
              <Link
                to={{
                  pathname: '/films',
                  query: {id}
                }}
              > {value} </Link>
              </Grid.Column>
            <Grid.Column width={6}>
          <Label pointing='left'>Chercher un film, une série ou un acteur/trice...</Label>
              </Grid.Column>
          </Grid>

        </div>
      </div>
    );
  }

}
export default withStyles(Menu, s);
