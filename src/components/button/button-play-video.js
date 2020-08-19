import PropTypes from "prop-types";
import React from 'react';
import {Link} from 'react-router-dom';


const ButtonPlayVideo = (props) => {
  const {pathName} = props;
  return (
    <Link to={`/${pathName}/play`} className="btn btn--play movie-card__button" type="button">
      <svg viewBox="0 0 19 19" width={19} height={19}>
        <use xlinkHref="#play-s" />
      </svg>
      <span>Play</span>
    </Link>
  );
};

ButtonPlayVideo.propTypes = {
  pathName: PropTypes.string.isRequired
};

export default ButtonPlayVideo;
