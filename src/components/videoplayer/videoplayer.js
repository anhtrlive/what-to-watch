import React from 'react';
import PropTypes from 'prop-types';
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      fullscreen: false,
      duraTionTime: -1,
      runTime: 0.001,
      volume: 1,
    };
    this._videoRef = React.createRef();
    this._progressRef = React.createRef();
    this._playerRef = React.createRef();
    this._controlPanelRef = React.createRef();
    this._exitLinkRef = React.createRef();
    this._volumeRef = React.createRef();
    this._progressVolumeRef = React.createRef();
    this._volimeTogglerRef = React.createRef();
    this.timerId = -1;
    this.timerHodeControlPanel = -1;
    this.volumePrevState = 0;
    this._playPauseCLickHandler = this._playPauseCLickHandler.bind(this);
    this._fullScreenVideo = this._fullScreenVideo.bind(this);
    this._fullScreenVideoKeyHandler = this._fullScreenVideoKeyHandler.bind(this);
    this._setTime = this._setTime.bind(this);
    this._sec2time = this._sec2time.bind(this);
    this._slide = this._slide.bind(this);
    this._flag = true;
    this._sliderAddEventListener = this._sliderAddEventListener.bind(this);
    this._sliderMouseUpHadnler = this._sliderMouseUpHadnler.bind(this);
    this._hideControlPanelOnMouseMove = this._hideControlPanelOnMouseMove.bind(this);
    this._volumeHandler = this._volumeHandler.bind(this);
    this._showVolumeValue = this._showVolumeValue.bind(this);
    this._hideVolumeValue = this._hideVolumeValue.bind(this);
    this._slideVolume = this._slideVolume.bind(this);
    this._slideVolemeHandler = this._slideVolemeHandler.bind(this);
  }

  _slide(evt) {
    evt.preventDefault();
    const video = this._videoRef.current;
    const progress = this._progressRef.current;
    let videoDuration = (isNaN(video.duration)) ? this.state.runTime : video.duration;
    let postionXprocent = ((evt.clientX - 25) / progress.offsetWidth) * 100;
    postionXprocent = Math.min(99.9, postionXprocent);
    postionXprocent = Math.max(0, postionXprocent);
    video.currentTime = postionXprocent / 100 * videoDuration;
    this.setState(() => ({
      duraTionTime: +(video.duration - video.currentTime).toFixed(3),
    }));
  }

  _slideVolume(evt) {
    evt.preventDefault();
    const video = this._videoRef.current;
    const progress = this._progressVolumeRef.current;
    let coord = progress.getBoundingClientRect();
    let postionXprocent = ((evt.clientX - coord.x - 7) / coord.width) * 100;
    postionXprocent = Math.min(99.9, postionXprocent);
    postionXprocent = Math.max(0, postionXprocent);
    video.volume = postionXprocent / 100;
    this.setState(() => ({
      volume: video.volume,
    }));
  }

  _playPauseCLickHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    document.removeEventListener(`mouseup`, this.sliderMouseUpHadnler);
    this.setState((state) => ({
      playing: state.playing ? false : true
    }));
  }
  _volumeHandler(evt) {
    if (evt.keyCode === 77 || evt.target.classList[0] === `fas`) {
      const video = this._videoRef.current;
      const prevVolume = this.volumePrevState;
      this.volumePrevState = this.state.volume;
      this.setState((prevState) => {
        if (prevState.volume === 0) {
          video.volume = prevVolume;
          return {volume: prevVolume};
        } else {
          video.volume = 0;
          return {volume: 0};
        }
      });
    }
  }

  _fullScreenVideo(evt) {
    if (evt.target.parentElement.clientWidth === 27
      || evt.target.clientWidth === 27) {
      document.removeEventListener(`mouseup`, this.sliderMouseUpHadnler);
      const video = this._videoRef.current;
      if (this.state.fullscreen === false) {
        video.parentElement.webkitRequestFullscreen();
      }
      if (this.state.fullscreen === true) {
        document.webkitExitFullscreen();
      }
    }
  }

  _fullScreenVideoKeyHandler(evt) {
    if (evt.target.className === `player__video` || evt.keyCode === 70) {
      document.removeEventListener(`mouseup`, this.sliderMouseUpHadnler);
      const video = this._videoRef.current;
      if (this.state.fullscreen === false) {
        video.parentElement.webkitRequestFullscreen();
      }
      if (this.state.fullscreen === true) {
        document.webkitExitFullscreen();
      }
    }
  }

  _setTime(video) {
    if (this.timerId === -1) {
      this.timerId = setInterval(()=>{
        let videoDuration = (isNaN(video.duration)) ? this.state.runTime : video.duration;
        this.setState(() => ({
          duraTionTime: +(videoDuration - video.currentTime).toFixed(3),
        }));
      }, 50);
    }
  }

  _reset(video) {
    if (this.state.playing) {
      const controlPanel = this._controlPanelRef.current;
      const player = this._playerRef.current;
      const exitLink = this._exitLinkRef.current;
      controlPanel.style = `opacity:1; transition:opacity 0.2s linear;*`;
      exitLink.style = `opacity:1; transition:opacity 0.2s linear;*`;
      player.style = `cursor: auto`;
      clearInterval(this.timerId);
      this.timerId = -1;
      video.load();
      this.setState({
        playing: false,
        duraTionTime: this.state.runTime,
      });
    }
  }

  _sec2time(timeInSeconds) {
    timeInSeconds = +timeInSeconds.toFixed(3);
    if (timeInSeconds === 0) {
      return `00:00`;
    }
    const pad = (num, size) => (`00` + num).slice(size * -1);
    let time = parseFloat(timeInSeconds).toFixed(3);
    let hours = Math.floor(time / 60 / 60);
    let minutes = Math.floor(time / 60) % 60;
    let seconds = Math.floor(time - minutes * 60);
    if (hours === 0) {
      return pad(minutes, 2) + `:` + pad(seconds, 2);
    }
    return pad(hours, 2) + `:` + pad(minutes, 2) + `:` + pad(seconds, 2);
  }

  _hideControlPanelOnMouseMove() {
    if (this.state.playing) {
      const controlPanel = this._controlPanelRef.current;
      const exitLink = this._exitLinkRef.current;
      const player = this._playerRef.current;
      player.style = `cursor: auto`;
      controlPanel.style = `opacity:1; transition:opacity 0.2s linear;*`;
      exitLink.style = `opacity:1; transition:opacity 0.2s linear;*`;
      clearTimeout(this.timerHodeControlPanel);
      let changeOpacityTarget = () => {
        if (this.state.playing) {
          player.style = `cursor: none`;
          controlPanel.style = `opacity:0; transition:opacity 0.2s linear;*`;
          exitLink.style = `opacity:0; transition:opacity 0.2s linear;*`;
        }
      };
      changeOpacityTarget = changeOpacityTarget.bind(this);
      this.timerHodeControlPanel = setTimeout(changeOpacityTarget, 3000);
    }
  }

  _showVolumeValue() {
    this._volumeRef.current.classList.add(`volume-active`);
  }

  _hideVolumeValue() {
    this._slideVolemeHandler();
    this._volumeRef.current.classList.remove(`volume-active`);
  }

  render() {
    const {films, pathMovieName} = this.props;
    let filmName;
    let movie = [];
    if (films.length !== 0) {
      filmName = pathMovieName.toLowerCase().split(`-`).join(` `);
      movie = films.filter((film) => film.name.toLowerCase() === filmName)[0];
      if (movie === undefined) {
        return <Redirect to="/page-not-found" />;
      }
    }
    const {videoLink, previewImage, name} = movie;
    const img = previewImage;
    const previewVideoLink = videoLink;
    const button = (this.state.playing) ? `#pause` : `#play-s`;
    let timeDuration = (this.state.duraTionTime === -1) ? this.state.runTime : this.state.duraTionTime;
    timeDuration = (isNaN(timeDuration)) ? this.state.runTime : timeDuration;
    const valueProgress = (1 - timeDuration / this.state.runTime) * 100;
    const volumeProgress = this.state.volume * 100;
    const timePastInMinuteSecFormat = this._sec2time(this.state.runTime - timeDuration);
    const videoDurationMinuteSecFormet = this._sec2time(this.state.runTime);

    return <div className="player" ref = {this._playerRef}
      onKeyDown={(evt) => {
        this._fullScreenVideoKeyHandler(evt);
        this._volumeHandler(evt);

      }}
      onMouseMove={this._hideControlPanelOnMouseMove}
      onClick={this._hideControlPanelOnMouseMove}
      onDoubleClick={this._fullScreenVideoKeyHandler}
      tabIndex="0"
    >
      <video ref = {this._videoRef}
        className="player__video"
        src={previewVideoLink}
        poster={img}
      />
      <Link to={(location) => {
        const goBackPathName = location.pathname
          .split(`/`)
          .slice(0, 2)
          .join(`/`);
        return {
          location,
          pathname: goBackPathName + `/overview`,
        };
      }} className="player__exit" ref={this._exitLinkRef}>Exit</Link>
      <div className="player__controls" ref={this._controlPanelRef} >
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress"
              value={valueProgress}
              max="100"
              ref = {this._progressRef}
              onMouseDown={(evt) => {
                this._slide(evt);
                this._sliderAddEventListener(evt);
              }}
            ></progress>
            <div className="player__toggler" style={{left: `${valueProgress}%`}}
              onMouseDown={(evt) => {
                this._slide(evt);
                this._sliderAddEventListener(evt);
              }}
            >Toggler</div>
          </div>
          <div className="player__time-value" style={{width: `85px`}}>{`${timePastInMinuteSecFormat} / ${videoDurationMinuteSecFormet}`}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={this._playPauseCLickHandler}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={button}/>
            </svg>
            <span>Play</span>
          </button>
          <div id="fashover" onMouseEnter={this._showVolumeValue} onMouseLeave={this._hideVolumeValue}>
            {(!this.state.volume) ? (<i className='fas fa-volume-mute' onClick={this._volumeHandler}/>)
              : (<i className='fas fa-volume-up' onClick={this._volumeHandler}/>)}
          </div>
          <div className="volume__value" ref={this._volumeRef}
            onMouseLeave={this._hideVolumeValue}
            onMouseEnter={this._showVolumeValue}>
            <progress className="volume__progress"
              ref={this._progressVolumeRef}
              value={volumeProgress}
              max="100"
              onMouseDown={(evt) => {
                this._slideVolume(evt);
                const toggler = this._volimeTogglerRef.current;
                toggler.addEventListener(`mousemove`, this._slideVolume);
              }}
              onMouseUp={this._slideVolemeHandler}
            ></progress>
            <div className="volume__toggler"
              ref={this._volimeTogglerRef}
              style={{left: `${volumeProgress}px`}}
              onMouseDown={(evt) => {
                this._slideVolume(evt);
                evt.target.addEventListener(`mousemove`, this._slideVolume);
              }}
              onMouseUp={this._slideVolemeHandler}
            >Toggler</div>
          </div>
          <div className="player__name">{name}</div>
          <button type="button" className="player__full-screen" onClick={this._fullScreenVideo}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>;
  }

  _slideVolemeHandler() {
    const progress = this._progressVolumeRef.current;
    const toggler = this._volimeTogglerRef.current;
    progress.removeEventListener(`mousemove`, this._slideVolume);
    toggler.removeEventListener(`mousemove`, this._slideVolume);
  }
  _sliderMouseUpHadnler(evt, prevStatePlaying) {
    const player = this._playerRef.current;
    evt.stopPropagation();
    player.removeEventListener(`mousemove`, this._slide);
    this.setState(() => ({
      playing: prevStatePlaying
    }));
    document.removeEventListener(`mouseup`, this.mouseUpHandler);
  }

  _sliderAddEventListener() {
    const prevStatePlaying = this.state.playing;
    const player = this._playerRef.current;
    player.addEventListener(`mousemove`, this._slide);
    this.setState(() => ({
      playing: false
    }));
    this.mouseUpHandler = (evt) => {
      this._sliderMouseUpHadnler(evt, prevStatePlaying);
    };
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    document.addEventListener(`mouseup`, this.mouseUpHandler);
  }

  componentDidMount() {
    const video = this._videoRef.current;
    video.onloadedmetadata = () => {
      this.setState(() => ({
        runTime: video.duration,
      }));
    };
    video.parentElement.onwebkitfullscreenchange = () => {
      this.setState((state) => ({
        fullscreen: state.fullscreen ? false : true
      }));
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const video = this._videoRef.current;
    if (video) {
      video.muted = this.state.muted;
      if (video.paused === true && this.state.playing) {
        this._setTime(video);
      }
      if (this.state.playing && prevState.playing === false) {
        video.play();
      }

      if (this.state.playing && video.currentTime === this.state.runTime) {
        this._reset(video);
      }
      if (this.state.playing === false) {
        clearInterval(this.timerId);
        this.timerId = -1;
        video.pause();
      }
    }
  }

  componentWillUnmount() {
    let video = this._videoRef.current;
    if (video) {
      const player = this._playerRef.current;
      clearInterval(this.timerId);
      video.src = ``;
      video.poster = ``;
      video = null;
      document.removeEventListener(`mouseup`, this.sliderMouseUpHadnler);
      player.removeEventListener(`mousemove`, this._slide);
    }
  }

}

VideoPlayer.propTypes = {
  films: PropTypes.array.isRequired,
  pathMovieName: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    films: state.films,
  });
};

export {VideoPlayer};

export default connect(mapStateToProps)(VideoPlayer);
