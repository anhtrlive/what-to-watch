import {createSelector} from 'reselect';

const getGenre = (state, genre) => {
  return genre;
};

const getFilms = (state) => {
  return state.films;
};

const numberOfshowCar = (state) => {
  return state.showcard;
};

const filterByGenre = createSelector(
    getFilms,
    getGenre,
    numberOfshowCar,
    (films, genre, numberCard) => {
      let filmList = (genre === `All genres`) ?
        films :
        films.filter((el) => (el.genre === genre));
      return filmList.slice(0, numberCard);
    }
);

export {filterByGenre};
