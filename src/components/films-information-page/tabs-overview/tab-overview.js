import React from 'react';
import PropTypes from 'prop-types';

const Overview = (props) => {
  const {stringRaiting, rating, description, director, starrings, scoresCount} = props;
  return <section>
    <div className="movie-rating">
      <div className="movie-rating__score">{rating}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{stringRaiting}</span>
        <span className="movie-rating__count">{scoresCount} ratings</span>
      </p>
    </div>
    <div className="movie-card__text">
      <p>{description}</p>
      <p className="movie-card__director"><strong>Director: {director}</strong></p>
      <p className="movie-card__starring"><strong>Starring: {starrings.join(`, `)} and other</strong></p>
    </div>
  </section>;
};

Overview.propTypes = {
  stringRaiting: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starrings: PropTypes.array.isRequired,
  scoresCount: PropTypes.number.isRequired,
};

export {Overview};
