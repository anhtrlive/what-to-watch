import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {Operation} from '../../reducer';

class ButtonPlusList extends PureComponent {
  constructor(props) {
    super(props);
    this._checkIsFavorite = this._checkIsFavorite.bind(this);
  }

  _checkIsFavorite() {
    const {name, bookmarks} = this.props;
    return bookmarks.some((element) => element === name) ? 0 : 1;
  }

  render() {
    const {movieId, switchFavorite} = this.props;

    return <button className="btn btn--list movie-card__button" type="button"
      onClick={()=> {
        switchFavorite(movieId, this._checkIsFavorite());
      }}>
      {(this._checkIsFavorite()) ? (<svg viewBox="0 0 19 20" width={19} height={20}>
        <use xlinkHref="#add" />
      </svg>) : (<svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"/>
      </svg>)}
      <span>My list</span>
    </button>;
  }
}

ButtonPlusList.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  movieId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  switchFavorite: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    bookmarks: state.bookmarks,
  });
};

const mapDispatchToProps = (dispatch) => ({
  switchFavorite: (movieId, flag) => {
    dispatch(Operation.switchFavorite(movieId, flag));
  },
});

export {ButtonPlusList};
export default connect(mapStateToProps, mapDispatchToProps)(ButtonPlusList);
