import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ShowMore extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, genre, movies, showMore} = this.props;
    const showMoreFilterMovies = films.filter((el) => (el.genre === genre || genre === `All genres`));
    const showHideFlag = showMoreFilterMovies.length === movies.length;
    const divClassName = (showHideFlag) ? `catalog__more visually-hidden` : `catalog__more`;

    return <div className={divClassName}>
      <button className="catalog__button" type="button" onClick={()=> showMore(movies.length)}>
        Show more
      </button>
    </div>;
  }
}

ShowMore.propTypes = {
  genre: PropTypes.string.isRequired,
  films: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  showMore: PropTypes.func.isRequired,
};

export {ShowMore};
