import React from 'react';
import ReactDOM from 'react-dom';
import Aside from '../../../components/Aside';

describe('Smoke TestingAsideApp', () => {
  it('renders Aside component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Aside />, div);
  });
});