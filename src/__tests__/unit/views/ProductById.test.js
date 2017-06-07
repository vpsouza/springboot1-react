import React from 'react';
import { shallow } from 'enzyme';
import ProductById from '../../../views/ProductById';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

describe('Smoke Testing ProductById', () => {

    it('renders without crashing', () => {
        shallow(<ProductById routeParams={{id: 1}} />);
    });
});