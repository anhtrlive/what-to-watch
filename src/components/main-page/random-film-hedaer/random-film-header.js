import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {linkCheckPlusButton} from '../../hocs/my-list-button';
import ButtonPlusList from '../../button/button-plus-list';
import LinkLoginPlusList from '../../button/link-to-login';
import ButtonPlayVideo from '../../button/button-play-video';

const ButtonBookmarks = linkCheckPlusButton(LinkLoginPlusList, ButtonPlusList);

class ShowRanmdomFile extends PureComponent {
  constructor(props) {
    super(props);
  }

  radnomNumber(max) {
    return Math.floor(Math.random() * (max - 1));
  }

  render() {
    const {isAutorized} = this.props;
    if (sessionStorage.randomNum === undefined) {
      window.sessionStorage.setItem(`randomNum`, this.radnomNumber(this.props.films.length));
    }
    const {name, genre, posterImage, released, backgroundImage, id} = this.props.films[Number(window.sessionStorage.getItem(`randomNum`))];
    let pathName = name.toLowerCase().split(` `).join(`-`);
    return (
      <div className="movie-card__wrap">
        <div className="movie-card__bg">
          <img
            src={backgroundImage}
            alt={name}
          />
        </div>
        <div className="movie-card__info">
          <Link to={`/${pathName}/overview`} className="movie-card__poster">
            <img
              src={posterImage}
              alt={name}
              width={218}
              height={327}
            />
          </Link>
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{released}</span>
            </p>
            <div className="movie-card__buttons">
              <ButtonPlayVideo pathName={pathName} />
              <ButtonBookmarks
                movieId={id}
                isAutorized={isAutorized}
                name={name}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShowRanmdomFile.propTypes = {
  films: PropTypes.array.isRequired,
  isAutorized: PropTypes.bool.isRequired,
};

export {ShowRanmdomFile};
