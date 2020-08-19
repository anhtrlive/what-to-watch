import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FilmsList} from '../moviecard-films-list/films-list';
import {GenreList} from './genre-list/genre-list';
import {ShowMore} from './show-more-button/show-more-button';
import {ActionCreator} from '../../reducer';
import {filterByGenre} from '../reselect/selector';
import {Link} from 'react-router-dom';
import {ShowRanmdomFile} from './random-film-hedaer/random-film-header';
import {withChangeGenreHandler} from '../hocs/active-genre-main-page';
import FooterLogo from '../footer/footer-logo';
import HeaderLogo from '../header/header-logo';
import HeaderAvatar from '../header/header-avatar';

const renderAuth = (films, filterGenre, movies, clickHandlerGenre, showMore, isAutorized, resetShowCard) => {
  const block = (<HeaderAvatar />);

  const link = (<div className="user-block">
    <Link to='/login' className="user-block__link">Sign in</Link>
  </div>);

  const linkOrImg = (isAutorized) ? block : link;
  return <Fragment>
    <section className="movie-card">
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header movie-card__head">
        <HeaderLogo />
        {linkOrImg}
      </header>
      {films.length ?
        <ShowRanmdomFile films = {films} isAutorized={isAutorized} /> :
        <Fragment></Fragment>}
    </section>
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <GenreList
          genre={filterGenre}
          films={films}
          clickHandlerGenre={clickHandlerGenre}
          resetShowCard={resetShowCard}
        />
        <FilmsList
          movies={movies}
          genre={filterGenre}
        />
        <ShowMore
          films={films}
          genre={filterGenre}
          movies={movies}
          showMore={showMore}
        />
      </section>
      <FooterLogo />
    </div>
  </Fragment>;
};

const MainPage = (props) => {
  let {films, genre, movies, clickHandlerGenre, showMore,
    isAutorized, resetShowCard} = props;

  return <Fragment>
    {renderAuth(films, genre, movies, clickHandlerGenre, showMore,
        isAutorized, resetShowCard)}
  </Fragment>;
};

MainPage.propTypes = {
  clickHandlerGenre: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired,
  genre: PropTypes.string.isRequired,
  isAutorized: PropTypes.bool.isRequired,
  movies: PropTypes.array.isRequired,
  resetShowCard: PropTypes.func.isRequired,
  showMore: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  const {genre} = ownProps;
  return Object.assign({}, ownProps, {
    movies: filterByGenre(state, genre),
    isAutorized: state.isAutorized,
  });
};

const mapDispatchToProps = (dispatch) => ({
  showMore: (length) => {
    dispatch(ActionCreator.showMore(length));
  },
  resetShowCard: () => {
    dispatch(ActionCreator.resetShowCard());
  }
});


export {MainPage};
export default withChangeGenreHandler(connect(mapStateToProps, mapDispatchToProps)(MainPage));
