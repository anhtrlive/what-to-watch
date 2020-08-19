import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation} from '../../reducer';

const ButtonCheckList = (props) => {
  const {switchFavorite, movieId} = props;
  return <button className="btn btn--list movie-card__button" type="button"
    onClick={ ()=> {
      switchFavorite(movieId, 0);
    }
    }>
    <svg viewBox="0 0 18 14" width="18" height="14">
      <use xlinkHref="#in-list"/>
    </svg>
    <span>My list</span>
  </button>;
};

ButtonCheckList.propTypes = {
  switchFavorite: PropTypes.func.isRequired,
  movieId: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  switchFavorite: (movieId, flag) => {
    dispatch(Operation.switchFavorite(movieId, flag));
  },
});

export {ButtonCheckList};
export default connect(null, mapDispatchToProps)(ButtonCheckList);
