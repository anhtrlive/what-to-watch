import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Operation} from '../../reducer';
import HeaderLogo from '../header/header-logo';
import HeaderAvatar from '../header/header-avatar';

class AddNewReview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      comment: ``,
    };
    this._textareaRef = React.createRef();
    this._showErrorRef = React.createRef();
    this._changeRaiting = this._changeRaiting.bind(this);
    this._changeText = this._changeText.bind(this);
  }

  _changeRaiting(evt) {
    this.setState({rating: +evt.target.value});
  }

  _changeText(evt) {
    this.setState({comment: evt.target.value});
  }
  render() {
    let {films, pathMovieName, addReview, isAutorized, history} = this.props;
    if (!isAutorized) {
      return <Redirect to='/login'/>;
    }
    let currentMovie = [];
    if (films.length > 0) {
      films.forEach((el) => {
        let fillName = el.name.toLowerCase().split(` `).join(`-`);
        if (fillName === pathMovieName) {
          currentMovie = el;
        }
      });
    }

    let {name, posterImage, backgroundImage, backgroundColor, id} = currentMovie;

    const block = (<HeaderAvatar />);

    const link = (<div className="user-block">
      <Link to='/login' className="user-block__link">Sign in</Link>
    </div>);

    const linkOrImg = (isAutorized) ? block : link;

    return (
      <section className="movie-card movie-card--full" style={{'background': `${backgroundColor}`}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <HeaderLogo />
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/${pathMovieName}/overview`} className="breadcrumbs__link">{name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
            {linkOrImg}
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" onChange={this._changeRaiting} type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" onChange={this._changeRaiting} type="radio" name="rating" value="2" />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" onChange={this._changeRaiting} type="radio" name="rating" value="3" />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" onChange={this._changeRaiting} type="radio" name="rating" value="4" />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" onChange={this._changeRaiting} type="radio" name="rating" value="5" defaultChecked/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>

                <input className="rating__input" id="star-6" onChange={this._changeRaiting} type="radio" name="rating" value="6"/>
                <label className="rating__label" htmlFor="star-6">Rating 6</label>

                <input className="rating__input" id="star-7" onChange={this._changeRaiting} type="radio" name="rating" value="7" />
                <label className="rating__label" htmlFor="star-7">Rating 7</label>

                <input className="rating__input" id="star-8" onChange={this._changeRaiting} type="radio" name="rating" value="8" />
                <label className="rating__label" htmlFor="star-8">Rating 8</label>

                <input className="rating__input" id="star-9" onChange={this._changeRaiting} type="radio" name="rating" value="9" />
                <label className="rating__label" htmlFor="star-9">Rating 9</label>

                <input className="rating__input" id="star-10" onChange={this._changeRaiting} type="radio" name="rating" value="10" defaultChecked/>
                <label className="rating__label" htmlFor="star-10">Rating 10</label>
              </div>
            </div>
            <div className='validationBlock' ref={this._showErrorRef}>
              <div className='validationMassage'>Text is too short(minimum is 50 characters)</div>
              <div id="triangleValidation"></div>
            </div>
            <div className="add-review__text">

              <textarea className="add-review__textarea" ref={this._textareaRef} minLength='50' maxLength='400' onChange={(evt) => {
                this._changeText(evt);
                if (this.state.comment.length >= 50) {
                  this._showErrorRef.current.classList.remove(`showValidationMassage`);
                }
              }} name="review-text" id="review-text" placeholder="Review text"></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" onClick={(evt) => {
                  evt.preventDefault();
                  let textareaLength = this._textareaRef.current.value.length;
                  if (textareaLength >= 50 && textareaLength <= 400) {
                    addReview(id, this.state);
                    history.push(`/${pathMovieName}/review`);
                  } else {
                    this._showErrorRef.current.classList.add(`showValidationMassage`);
                  }
                }}>Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

AddNewReview.propTypes = {
  addReview: PropTypes.func,
  films: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  isAutorized: PropTypes.bool.isRequired,
  pathMovieName: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    isAutorized: state.isAutorized,
  });
};
const mapDispatchToProps = (dispatch) => ({
  addReview: (movieId, body) => {
    dispatch(Operation.addReview(movieId, body));
  }
});

export {AddNewReview};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNewReview));
