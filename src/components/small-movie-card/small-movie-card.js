import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  render() {
    const {movieName, img, previewVideoLink, handleCardMouseEnter, handleCardonMouseLeave} = this.props;
    let pathName = movieName.toLowerCase().split(` `).join(`-`);
    return <article className="small-movie-card catalog__movies-card"
      onMouseOver={handleCardMouseEnter}
      onMouseLeave={handleCardonMouseLeave}
    >
      <Link to={`/${pathName}/overview`} className="small-movie-card__link">
        <div className="small-movie-card__image" >
          <video width="280" height="175" muted style={{objectFit: `fill`}}
            ref={this._videoRef}
            src={previewVideoLink}
            poster={img}
          />
        </div>
        <h3 className="small-movie-card__title">
          {movieName}
        </h3>
      </Link>
    </article>;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  componentWillUnmount() {
    let video = this._videoRef.current;
    video.src = ``;
    video.poster = ``;
    video = null;
  }
}

MovieCard.propTypes = {
  movieName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  handleCardMouseEnter: PropTypes.func.isRequired,
  handleCardonMouseLeave: PropTypes.func.isRequired,
};

export {MovieCard};
