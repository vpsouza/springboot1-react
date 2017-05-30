import React from 'react';
import ReactDOM from 'react-dom';
import CustomTable from '../../../components/CustomTable/CustomTable';

describe('Smoke Testing CustomTable', () => {
  it('renders CustomTable without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CustomTable headerColumns={[]} rows={[]} />, div);
  });
});