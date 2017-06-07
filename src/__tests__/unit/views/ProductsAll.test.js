import React from 'react';
import { shallow } from 'enzyme';
import ProductsAll from '../../../views/ProductsAll';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

describe('Smoke Testing ProductsAll', () => {

    it('renders without crashing', () => {
        shallow(<ProductsAll />);
    });
});