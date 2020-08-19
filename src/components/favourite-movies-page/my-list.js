import PropTypes from "prop-types";
import React from 'react';
import {FilmsList} from '../moviecard-films-list/films-list';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Operation} from '../../reducer';
import FooterLogo from "../footer/footer-logo";
import HeaderLogo from "../header/header-logo";
import HeaderAvatar from "../header/header-avatar";

const MyList = (props) => {
  let {bookmarks, films, isAutorized} = props;

  if (films) {
    films = films.filter((movie) => {
      return bookmarks.some((el) => el === movie.name);
    });
  }
  if (!isAutorized) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <HeaderLogo />
        <h1 className="page-title user-page__title">My list</h1>
        <HeaderAvatar />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList
          movies={films}
          genre={`my-list`}
        />
      </section>
      <FooterLogo />
    </div>
  );
};

MyList.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  films: PropTypes.array.isRequired,
  isAutorized: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMovies: () => {
    dispatch(Operation.loadFavoriteMovies());
  }
});

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    bookmarks: state.bookmarks,
    films: state.films,
    isAutorized: state.isAutorized,
  });
};


export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
