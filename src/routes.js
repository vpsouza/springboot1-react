import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Containers
import Full from './containers/Full/'
import Simple from './containers/Simple/'

import Products from './views/Products/'
import RunEndpoint from './views/RunEndpoint/'

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Products}/>
      <Route path="endpoints" name="Products" component={Products}/>
      <Route path="run" name="RunEndpoint" component={RunEndpoint}/>
    </Route>
  </Router>
);