import React from 'react';
import { shallow } from 'enzyme';
import ProductForm from '../../../components/ProductForm';

describe('Smoke Testing ProductForm', () => {

    it('renders without crashing', () => {
        shallow(<ProductForm />);
    });
});