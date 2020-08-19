import React, {PureComponent} from 'react';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activePlayer: false
      };
      this.timerId = null;
      this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
      this._handleCardonMouseLeave = this._handleCardonMouseLeave.bind(this);
    }

    _handleCardMouseEnter() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(()=>{
        this.setState({
          activePlayer: true,
        });
      }, 1000);
    }

    _handleCardonMouseLeave() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      if (this.state !== false) {
        this.setState({
          activePlayer: false,
        });
      }
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        isPlaying={activePlayer}
        handleCardMouseEnter={this._handleCardMouseEnter}
        handleCardonMouseLeave={this._handleCardonMouseLeave}
      />;
    }
    componentDidUpdate() {
      clearTimeout(this.timerId);
    }

    componentWillUnmount() {
      clearTimeout(this.timerId);
    }
  }

  return WithActivePlayer;
};

export {withActivePlayer};
