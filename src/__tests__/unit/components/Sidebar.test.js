import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../../../components/Sidebar';

describe('Smoke Testing Sidebar', () => {

    it('renders without crashing', () => {
        shallow(<Sidebar />);
    });
});