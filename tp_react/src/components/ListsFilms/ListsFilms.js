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
import s from './ListsFilms.scss';
require('isomorphic-fetch');

var {Image, Card, Icon, Grid, Segment, Label, Divider, Button} = require('semantic-ui-react');

const title = 'Par catégories';
var id,step3;

class ListFilms extends Component {

  constructor(props) {
    super();
    this.state = {movies:[]} ;
  }

  componentDidMount() {
    var url;
    if(step3[1] == 'films')
    {
      url = 'https://api.themoviedb.org/3/genre/'+id+'/movies?api_key=92f9fd9a64e4fc0fb9e735d9e7b42c93&language=fr&include_adult=false';
    }
    else if (step3[1] == 'series')
    {
      url = 'https://api.themoviedb.org/3/discover/tv?api_key=92f9fd9a64e4fc0fb9e735d9e7b42c93&language=fr&with_genres='+id;
    }

    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function(data) {
      this.setState({movies:data.results });
    }.bind(this) );

  }

  render() {

    var self = this;

    var url = location.search;
    var step1 = url.split("?");
    var step2 = step1[1].split("0",2);
    var index = url.indexOf('0');
    id = url.slice(index+1);
    step3 = step2[0].split("=");

    return (

      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <Card.Group itemsPerRow={4}>
            {
              this.state.movies.map(function(nodes) {
                var lien = "https://image.tmdb.org/t/p/w500/"+nodes.poster_path;
                var film = JSON.stringify(nodes);

                return (
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        {nodes.title||nodes.name}
                      </Card.Header>
                      <Image height="300px" src={lien}/>
                      <Card.Description>
                        {nodes.overview}
                      </Card.Description>
                      <br />
                      <Link
                        to={{
                          pathname: '/films',
                          query: { film }
                        }}
                      >Voir détails ...</Link>
                    </Card.Content>
                  </Card>

                )
              })
            }
          </Card.Group>
        </div>
      </div>
    );
  }
}
export default withStyles(ListFilms,s);


