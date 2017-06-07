import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from '../../../components/ProductList';

describe('Smoke Testing ProductList', () => {
  it('renders ProductList component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductList />, div);
  });
});