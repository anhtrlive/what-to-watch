import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const ListOftabs = (props) => {
  const {activeTab} = props;

  return <nav className="movie-nav movie-card__nav">
    <ul className="movie-nav__list">
      {[`Overview`, `Details`, `Review`].map((el, index) => {
        const liClassName = (el.toLowerCase() === activeTab) ?
          `movie-nav__item movie-nav__item--active` :
          `movie-nav__item`;

        return <li className={liClassName} key={(el + index).toString()}
          style={{cursor: `pointer`}}>
          <Link to={el.toLowerCase()} className="movie-nav__link">{el}</Link>
        </li>;
      })}
    </ul>
  </nav>;
};

ListOftabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export {ListOftabs};
