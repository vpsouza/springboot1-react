import axios from 'axios';

const baseURL = 'http://localhost:8080';
//const baseURL = 'https://vpsouza-springboot1.herokuapp.com';

export default class Api {
	static getBaseProductURL() {
		return baseURL;
	}

	static getProducts(){
		return axios.get(baseURL + '/products').then((response) => Promise.resolve(response.data));
	}

	static getAllProducts(){
		return axios.get(baseURL + '/products/all').then((response) => Promise.resolve(response.data));
	}

	static getProductById(id){
		return axios.get(baseURL + '/products/' + id).then((response) => Promise.resolve(response.data));
	}

	static getProductByIdAll(id){
		return axios.get(baseURL + '/products/' + id + '/all').then((response) => Promise.resolve(response.data));
	}

	static getProductImagesById(id){
		return axios.get(baseURL + '/products/' + id + '/images').then((response) => Promise.resolve(response.data));
	}

	static getProductChildrenById(id){
		return axios.get(baseURL + '/products/' + id + '/children').then((response) => Promise.resolve(response.data));
	}

	static saveProduct(product){
		return axios.post(baseURL + '/products', product).then((response) => Promise.resolve(response.data));
	}

	static updateProduct(product){
		return axios.patch(baseURL + '/products', product).then((response) => Promise.resolve(response.data));
	}

	static deleteProduct(id) {
		return axios.delete(baseURL + '/products/' + id).then((response) => Promise.resolve(response.data));
	}
};