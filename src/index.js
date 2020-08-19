import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import App from './app';
import {reducer, Operation} from './reducer';
import {createApi} from './api';
import './css/style.css';

const init = () => {
  const api = createApi((...args) => store.dispatch(...args));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
      )
  );

  store.dispatch(Operation.loadData());
  store.dispatch(Operation.checkautorized());

  ReactDOM.render(<Provider store={store}>
    <BrowserRouter basename="/what-to-watch">
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
