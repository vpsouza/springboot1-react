import React from 'react';
import ReactDOM from 'react-dom';
import ProductsAll from '../../../views/ProductsAll';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

describe('Smoke Testing ProductsAll', () => {
  it('renders ProductsAll without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductsAll />, div);
  });
});