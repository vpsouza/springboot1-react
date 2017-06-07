import React from 'react';
import { shallow } from 'enzyme';
import Aside from '../../../components/Aside';

describe('Smoke Testing Aside', () => {

    it('renders without crashing', () => {
        shallow(<Aside />);
    });
});