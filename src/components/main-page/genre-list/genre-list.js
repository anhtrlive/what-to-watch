import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GenreList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {genre, films, clickHandlerGenre, resetShowCard} = this.props;
    let allGennre = new Set(films.map((el) => el.genre));
    allGennre = [...allGennre.keys()];
    allGennre.sort();
    allGennre = [`All genres`, ...allGennre];

    return <ul className="catalog__genres-list">
      {allGennre.map((element, index) => {
        const liClasses = (genre === element) ?
          `catalog__genres-item catalog__genres-item--active` :
          `catalog__genres-item`;

        return <li
          className ={liClasses}
          onClick={(evt) => {
            clickHandlerGenre(evt);
            resetShowCard();
          }}
          key={`${element}-${index}`}
        >
          <a href="#a" className="catalog__genres-link">
            {element}
          </a>
        </li>;
      })}
    </ul>;
  }
}

GenreList.propTypes = {
  genre: PropTypes.string.isRequired,
  films: PropTypes.array.isRequired,
  clickHandlerGenre: PropTypes.func.isRequired,
  resetShowCard: PropTypes.func.isRequired,
};

export {GenreList};
