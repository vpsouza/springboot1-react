import React from 'react';
import { shallow } from 'enzyme';
import Products from '../../../views/Products';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

describe('Smoke Testing Products', () => {

    it('renders without crashing', () => {
        shallow(<Products />);
    });
});