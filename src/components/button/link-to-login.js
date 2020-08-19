import React from 'react';
import {Link} from 'react-router-dom';

const LinkLoginPlusList = () => {
  return <Link to="/login" className="btn btn--list movie-card__button">
    <svg viewBox="0 0 19 20" width={19} height={20}>
      <use xlinkHref="#add" />
    </svg>
    <span>My list</span>
  </Link>;
};

export default LinkLoginPlusList;
