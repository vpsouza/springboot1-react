import React from 'react';
import ReactDOM from 'react-dom';
import Endpoints from '../../../views/Endpoints/Endpoints';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

describe('Smoke Testing Endpoints', () => {
  it('renders Endpoints without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Endpoints />, div);
  });
});