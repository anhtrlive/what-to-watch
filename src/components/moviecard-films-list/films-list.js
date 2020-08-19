import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {MovieCard} from '../small-movie-card/small-movie-card';
import {withActivePlayer} from '../hocs/moviecard-with-player';

const MovieCardWithPlayer = withActivePlayer(MovieCard);
class FilmsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let {movies, genre} = this.props;
    return <div className="catalog__movies-list">
      {movies.map((filmData, index) => {
        return <MovieCardWithPlayer
          key = {(genre + filmData.id + index).toString()}
          movieName = {filmData.name}
          img = {filmData.previewImage}
          genre = {genre}
          previewVideoLink = {filmData.previewVideoLink}
        />;
      })}
    </div>;
  }
}

FilmsList.propTypes = {
  movies: PropTypes.array.isRequired,
  genre: PropTypes.string,
};

export {FilmsList};
