import React from 'react';
import ReactDOM from 'react-dom';
import Loading from '../../../components/Loading';

describe('Smoke TestingLoadingApp', () => {
  it('renders Loading component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loading />, div);
  });
});