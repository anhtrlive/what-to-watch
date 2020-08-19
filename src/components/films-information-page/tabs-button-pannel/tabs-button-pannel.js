import React from 'react';
import PropTypes from 'prop-types';
import {linkCheckPlusButton} from '../../hocs/my-list-button';
import ButtonPlusList from '../../button/button-plus-list';
import LinkLoginPlusList from '../../button/link-to-login';
import ButtonPlayVideo from '../../button/button-play-video';
import {Link} from 'react-router-dom';

const ButtonBookmarks = linkCheckPlusButton(LinkLoginPlusList, ButtonPlusList);

const HeaderTabs = (props) => {
  const {name, genre, released, isAutorized, movieId} = props;
  let pathName;
  if (name) {
    pathName = name.toLowerCase().split(` `).join(`-`);
  }
  return <div className="movie-card__wrap">
    <div className="movie-card__desc">
      <h2 className="movie-card__title">{name}</h2>
      <p className="movie-card__meta">
        <span className="movie-card__genre">{genre}</span>
        <span className="movie-card__year">{released}</span>
      </p>
      <div className="movie-card__buttons">
        <ButtonPlayVideo pathName={pathName} />
        <ButtonBookmarks
          movieId={movieId}
          isAutorized={isAutorized}
          name={name}
        />
        <Link to={`/${pathName}/add-review`} className="btn movie-card__button">Add review</Link>
      </div>
    </div>
  </div>;
};

HeaderTabs.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired,
  isAutorized: PropTypes.bool.isRequired,
  movieId: PropTypes.number.isRequired,
};

export default HeaderTabs;
