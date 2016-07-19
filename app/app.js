import 'babel-polyfill';
import 'sanitize.css/sanitize.css';

import React                    from 'react';
import ReactDOM                 from 'react-dom';
import { Provider }             from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll                from 'react-router-scroll';
import { selectLocationState }  from 'containers/App/selectors';
import { 
  applyRouterMiddleware, Router, browserHistory 
} from 'react-router';

import configureStore from './store';
import App            from 'containers/App';
import createRoutes from './routes';


const initialState = {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

ReactDOM.render(
  <Provider store = { store }>
    <Router
      history = { history }
      routes  = { rootRoute }
      render  = {
        applyRouterMiddleware(useScroll())
      }
    />
  </Provider>,
  document.getElementById('app')
);
