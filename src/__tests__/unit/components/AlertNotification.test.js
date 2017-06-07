import React from 'react';
import { shallow } from 'enzyme';
import AlertNotification from '../../../components/AlertNotification';

describe('Smoke Testing AlertNotification', () => {

    it('renders without crashing', () => {
        shallow(<AlertNotification />);
    });
});