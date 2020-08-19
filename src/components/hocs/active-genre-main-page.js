import React, {PureComponent} from 'react';

const withChangeGenreHandler = (Component) => {
  class WithChangeGenreHandler extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        genre: `All genres`
      };
      this._clickHandlerGenre = this._clickHandlerGenre.bind(this);
    }
    _clickHandlerGenre(evt) {
      evt.preventDefault();
      this.setState({
        genre: evt.target.textContent,
      });
    }

    render() {
      const {genre} = this.state;

      return <Component
        {...this.props}
        genre={genre}
        clickHandlerGenre={this._clickHandlerGenre}
      />;
    }
  }

  return WithChangeGenreHandler;
};

export {withChangeGenreHandler};
