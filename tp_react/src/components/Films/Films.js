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

  render()
  {
   var self = this;

    var url = location.search;
    var step1 = url.split("?");
    var step2 = step1[1].split("=");
    var step3 = decodeURIComponent(step2[1]);
    var step4 = step3.replace(/\+/g, " ");

    film = JSON.parse(step4);
    id = film.id;
    var movie;
    var actor = this.state.info;
    if(typeof this.state.actors != "undefined")
    {
       movie = this.state.actors.map(function(nodes) {
        return (
          nodes.name
        )
      });
    }

    var date, header, overview, vote,image;

    if(film.release_date || film.title)
    {
      date = 'Date de sortie : '+film.release_date;
      header = film.title;
      overview = 'Résumé : '+film.overview;
      vote = 'Note : '+film.vote_average;
      image = "https://image.tmdb.org/t/p/w500/"+film.poster_path;
      movie = 'Casting : ' + movie;
      type = 0;
    }
    else if (film.first_air_date || film.media_type == 'tv')
    {
      date = 'Date de sortie : '+film.first_air_date;
      header = film.name;
      overview = 'Résumé : '+film.overview;
      vote = 'Note : '+film.vote_average;
      image = "https://image.tmdb.org/t/p/w500/"+film.poster_path;
      movie = 'Casting : ' + movie;
      type = 1;
    }
      else if(film.media_type == 'person')
    {
      date = 'Anniversaire : '+actor.birthday;
      header = actor.name;
      overview = 'Biographie : '+actor.biography;
      vote = 'Note : '+actor.popularity;
      image = "https://image.tmdb.org/t/p/w500/"+actor.profile_path;
      type = 2;
    }


    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <Grid>
            <Grid.Row>
            <Grid.Column width={4} >
          <Card>
            <Image src={image}/>
            <Card.Content>
              <Card.Header>
                {header}
              </Card.Header>
              <Card.Meta>
                {date}
              </Card.Meta>
            </Card.Content>
          </Card>
              </Grid.Column>
                <Grid.Column width={10} verticalAlign='middle' >
                {overview}
                <br />
                  <br />
                <b> {movie} </b>
                <br />
                <br />
                <Label color='black'>
                  <Icon name='star' size='big' color='yellow' />
                 {vote}
                </Label>
                  <br />
                <a href="http://www.site-telechargement.org/">Télécharger</a>
                  <br />
                <a href="http://www.site-telechargement.org/qualite/dvdrip-bdrip">Télécharger en Blueray</a>
                  <br />
                  <Label basic as="a">
                    <Icon circular color='red' name='like' />
                    Ajouter aux favoris
                  </Label>
                </Grid.Column>
                </Grid.Row>
                </Grid>
        </div>
      </div>

    )
  }
}

export default withStyles(Films,s);
