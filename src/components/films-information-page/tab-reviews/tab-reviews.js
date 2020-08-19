import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Review = (props) => {
  let {comments} = props;

  return <div className="movie-card__reviews movie-card__row">
    <div className="movie-card__reviews-col">

      {comments.map((element) => {
        let option = {year: `numeric`, month: `long`, day: `numeric`};
        let {rating, comment, date, user} = element;
        let formatDate = new Date(date).toLocaleDateString(`en-EN`, option);
        return <div className="review" key={date + user.id}>
          <blockquote className="review__quote">
            <p className="review__text">{comment}</p>
            <footer className="review__details">
              <cite className="review__author">{user.name}</cite>
              <time className="review__date" dateTime="2016-12-24">{formatDate}</time>
            </footer>
          </blockquote>
          <div className="review__rating">{rating}</div>
        </div>;
      })}
    </div>
  </div>;
};

Review.propTypes = {
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    comments: state.comments,
  });
};

export {Review};
export default connect(mapStateToProps, null)(Review);
