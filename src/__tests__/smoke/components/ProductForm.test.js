import React from 'react';
import ReactDOM from 'react-dom';
import ProductForm from '../../../components/ProductForm';

describe('Smoke Testing ProductForm', () => {
  it('renders ProductForm component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductForm />, div);
  });
});