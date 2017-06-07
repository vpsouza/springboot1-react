import React from 'react';
import { shallow } from 'enzyme';
import ProductList from '../../../components/ProductList';

describe('Smoke Testing ProductList', () => {

    it('renders without crashing', () => {
        shallow(<ProductList />);
    });
});