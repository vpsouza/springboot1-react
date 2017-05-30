import axios from 'axios';

//const baseURL = 'http://localhost:3001';
const baseURL = 'https://xy-inc-node.herokuapp.com';

export default class Api {
	static getBaseEndpointURL() {
		return baseURL;
	}
	static getEndpoints(){
		return axios.get(baseURL + '/endpoints').then((response) => Promise.resolve(response.data));
	}

	static saveEndpoint(endpoint){
		return axios.post(baseURL + '/endpoints', endpoint).then((response) => Promise.resolve(response.data));
	}

	static updateEndpoint(endpoint){
		return axios.put(baseURL + '/endpoints/' + endpoint._id.toString(), endpoint).then((response) => Promise.resolve(response.data));
	}

	static deleteEndpoint(id) {
		return axios.delete(baseURL + '/endpoints/' + id).then((response) => Promise.resolve(response.data));
	}
};