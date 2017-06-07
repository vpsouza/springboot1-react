import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../../../components/Sidebar';

describe('Smoke TestingSidebarApp', () => {
  it('renders Sidebar component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sidebar />, div);
  });
});