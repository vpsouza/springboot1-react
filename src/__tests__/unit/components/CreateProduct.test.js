import React from 'react';
import { shallow } from 'enzyme';
import CreateProduct from '../../../components/CreateProduct';

describe('Smoke Testing CreateProduct', () => {

    it('renders without crashing', () => {
        shallow(<CreateProduct />);
    });
});