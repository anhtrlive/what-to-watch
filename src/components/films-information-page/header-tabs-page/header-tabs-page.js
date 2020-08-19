import PropTypes from "prop-types";
import React, {Fragment} from 'react';
import HeaderTabs from '../tabs-button-pannel/tabs-button-pannel';
import HeaderLogo from '../../header/header-logo';
import {Link} from 'react-router-dom';
import HeaderAvatar from "../../header/header-avatar";

const HeaderTabPage = (props) => {
  const {films, name, genre, released, isAutorized, movieId, backgroundImage} = props;

  return (
    <div className="movie-card__hero">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <HeaderLogo />
        {(isAutorized) ? (<HeaderAvatar />) : (<div className="user-block">
          <Link to='/login' className="user-block__link">Sign in</Link>
        </div>)}
      </header>
      {films.length > 0 ? <HeaderTabs name={name} genre={genre} released={released} isAutorized={isAutorized} movieId={movieId}/> : <Fragment></Fragment>}
    </div>
  );
};

HeaderTabPage.propTypes = {
  backgroundImage: PropTypes.string,
  films: PropTypes.array,
  genre: PropTypes.string,
  isAutorized: PropTypes.bool.isRequired,
  movieId: PropTypes.number,
  name: PropTypes.string,
  released: PropTypes.number,
};

export default HeaderTabPage;
