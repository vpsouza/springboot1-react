import React from 'react';
import { shallow } from 'enzyme';
import CustomTable from '../../../components/CustomTable';

describe('Smoke Testing CustomTable', () => {

    it('renders without crashing', () => {
        shallow(<CustomTable headerColumns={[]} rows={[]} />);
    });
});