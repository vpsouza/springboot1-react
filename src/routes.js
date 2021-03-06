import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Containers
import Full from './containers/Full/';
import Simple from './containers/Simple/';

import Products from './views/Products/';
import ProductById from './views/ProductById/';
import ProductsAll from './views/ProductsAll/';
import PropTypes from 'prop-types';

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Product" component={Full}>
      <IndexRoute component={Products}/>
	  <Route exact={true} path="products" name="Products" component={Products}/>
	  <Route exact={true} path="product/:id" name="Product by Id" component={ProductById}/>
	  <Route exact={true} path="products/all" name="Products All" component={ProductsAll}/>
    </Route>
  </Router>
);
