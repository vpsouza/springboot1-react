import React from 'react';
import ReactDOM from 'react-dom';
import CreateProduct from '../../../components/CreateProduct';

describe('Smoke TestingCreateProductApp', () => {
  it('renders CreateProduct component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateProduct />, div);
  });
});