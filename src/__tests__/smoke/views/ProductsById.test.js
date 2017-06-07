import React from 'react';
import ReactDOM from 'react-dom';
import ProductById from '../../../views/ProductById';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

describe('Smoke Testing ProductById', () => {
  it('renders ProductById without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductById routeParams={{id: 1}} />, div);
  });
});