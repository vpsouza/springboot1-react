import React from 'react';
import ReactDOM from 'react-dom';
import Products from '../../../views/Products';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

describe('Smoke Testing Products', () => {
  it('renders Products without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Products />, div);
  });
});