/**
 * Created by glo_0 on 24/01/2017.
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
import Link from '../Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Categories.scss';
require('isomorphic-fetch');

var {Image, Accordion, Icon, Grid, Segment, Label, Divider, Button} = require('semantic-ui-react');

const title = 'Catégories';


class Categories extends Component {

  constructor(props) {
    super();
    this.state = {films: [], series: []} ;
  }


  componentDidMount() {
    var url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=92f9fd9a64e4fc0fb9e735d9e7b42c93&language=fr';
    var url2 = 'https://api.themoviedb.org/3/genre/tv/list?api_key=92f9fd9a64e4fc0fb9e735d9e7b42c93&language=fr';
    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function(data) {
      this.setState({ films: data.genres });
    }.bind(this) );

    fetch(url2)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function(data) {
      this.setState({ series: data.genres });
    }.bind(this) );
  }


  render() {
    var self = this;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <Grid columns='2' divided>
          <ul>
            <p>Films</p>
            {
              this.state.films.map(function (nodes) {
                var id = 'films0'+nodes.id;
                return (
                  <Grid.Column width={8}>
                    <li>
                      <Link
                        to={{
                          pathname: '/lists',
                          query: {id}
                        }}
                      > {nodes.name} </Link>
                    </li>
                  </Grid.Column>
                )
              })
            }
            </ul>
            <ul>
              <p>Séries</p>
            {
              this.state.series.map(function(nodes) {
              var id = 'series0'+nodes.id;
              return (
              <Grid.Column width={8} >
              <li>
              <Link
              to={{
              pathname: '/lists',
              query: {id}
            }}
              > {nodes.name} </Link>
              </li>
              </Grid.Column>
              )
            })
            }
          </ul>
            </Grid>
        </div>
      </div>
    );
  }
}
export default withStyles(Categories,s);


