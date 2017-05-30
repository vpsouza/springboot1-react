import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

axios.defaults.adapter = httpAdapter;

it('renders without crashing', () => {
    shallow(<App />);
});