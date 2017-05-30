import React from 'react';
import ReactDOM from 'react-dom';
import AlertNotification from '../../../components/AlertNotification/AlertNotification';

describe('Smoke Testing AlertNotification', () => {
  it('renders AlertNotification without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AlertNotification />, div);
  });
});