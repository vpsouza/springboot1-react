import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../../../components/Loading/Loading';

describe('Smoke Testing Loading', () => {

    it('renders without crashing', () => {
        shallow(<Loading />);
    });
});