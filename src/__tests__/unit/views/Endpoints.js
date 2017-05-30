import React from 'react';
import { shallow } from 'enzyme';
import Endpoints from '../../../views/Endpoints/Endpoints';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

describe('Smoke Testing Endpoints', () => {

    it('renders without crashing', () => {
        shallow(<Endpoints />);
    });
});