/**
 * Created by glo_0 on 23/01/2017.
 */

import React, {Component,PropTypes} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Films.scss';
var {Image, Card, Icon, Grid, Label, Divider, Button} = require('semantic-ui-react');

const title = 'Film';
var id, type, film;

class Films extends Component{

  constructor(props) {
    super(props);
    this.state = {actors: [], info:[]} ;

  }

  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {

    var actorUrl;
    if(type==1)
      {
        actorUrl = 'https://api.themoviedb.org/3/tv/'+id+'/credits?api_key=92f9fd9a64e4fc0fb9e735d9e7b42c93&language=fr';
      }
    else if (!type)
      {
        actorUrl = 'https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=92f9fd9a64e4fc0fb9e735d9e7b42c93';

      }
      else if (type == 2)
      {
       actorUrl = 'https://api.themoviedb.org/3/person/'+id+'?api_key=92f9fd9a64e4fc0fb9e735d9e7b42c93&language=fr';
      }


    fetch(actorUrl)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      }).then(function(data) {
      this.setState({ actors: data.cast, info:data });
    }.bind(this) );

  }

  render() {
   


    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          

        </div>
      </div>

    )
  }
}

export default withStyles(Films,s);

