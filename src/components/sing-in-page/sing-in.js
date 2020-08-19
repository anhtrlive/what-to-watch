import PropTypes from "prop-types";
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Operation} from '../../reducer';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import FooterLogo from '../footer/footer-logo';
import HeaderLogo from '../header/header-logo';

class SingIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: ``,
      password: ``,
    };
    this._handleChangeEmail = this._handleChangeEmail.bind(this);
    this._handleChangePassword = this._handleChangePassword.bind(this);
  }

  _handleChangeEmail(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  _handleChangePassword(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  render() {
    let {isAutorized, autorized, history} = this.props;

    if (isAutorized) {
      return <Redirect to="/" />;
    }

    return <div className="user-page">
      <header className="page-header user-page__head">
        <HeaderLogo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={(evt) => {
          evt.preventDefault();
          if (this.state.email.length > 5 && this.state.password.length > 7) {
            autorized(this.state.email, this.state.password);
            history.goBack();
          }
        }
        }>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Email address" name="user-email" id="user-email" autoComplete="username" onChange={this._handleChangeEmail} minLength='6'/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" autoComplete="current-password"onChange={this._handleChangePassword} minLength='8'/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <FooterLogo />
    </div>;
  }
}

SingIn.propTypes = {
  autorized: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }),
  isAutorized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    isAutorized: state.isAutorized,
  });
};

const mapDispatchToProps = (dispatch) => ({
  autorized: (email, password) => {
    dispatch(Operation.autorized(email, password));
  },
});

export {SingIn};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingIn));
