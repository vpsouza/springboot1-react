import React, {Component} from 'react';
import {
		Button,
		Row,
		Col
} from 'reactstrap';
import Api from '../../api';
import CreateProduct from '../../components/CreateProduct';
import ProductList from '../../components/ProductList';
import AlertNotification from '../../components/AlertNotification';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'

class ProductById extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasNotification: false,
			fatalError: false,
			errorMessage: '',
			products: [],
			currentProduct: {
					name: '',
					properties: [],
					children: [],
					images: []
			},
			createProductAction: 'Edit'
		};
		this.handleCreateProductDelete = this
			.handleCreateProductDelete
			.bind(this);			
		this.handleCreateProductSubmit = this
			.handleCreateProductSubmit
			.bind(this);
		this.handleCreateProductReset = this
			.handleCreateProductReset
			.bind(this);
		this.handleAlertNotificationClosed = this
			.handleAlertNotificationClosed
			.bind(this);
	}

	componentDidMount() {
		this.getProductById();
	}

	getProductById() {
		Api
			.getProductByIdAll(this.props.routeParams.id)
			.then(res => {
				this.setState(() => ({currentProduct: res}));
				return Api.getAllProducts().then(res => {
					this.setState(() => ({products: res}));
					return Promise.resolve();
				})
			})
			.catch(res => {
				this.setState((prevState) => ({hasNotification: !prevState.hasNotification, errorMessage: res.response ? res.response.data.message : res.message, fatalError: !res.response ? true : false}));
			}); 
	}

	handleCreateProductSubmit(product) {
		let service = product.id ? Api.updateProduct : Api.saveProduct;
		service(product).then(newProduct => {
			this.getProductById();
			this.setState((prevState) => ({hasNotification: !prevState.hasNotification, errorMessage: 'Product ' + product.name + ' saved!', notificationColor: 'success'}));
		})
		.catch(res => {
			this.setState((prevState) => ({hasNotification: true, errorMessage: res.response ? res.response.data.message : res.message, notificationColor: 'danger'}));
		}); 
	}

	handleCreateProductReset() {
		browserHistory.goBack();
	}

	handleCreateProductDelete() {
		Api.deleteProduct(this.state.currentProduct.id).then(res => {
			this.props.router.replace('products/all');
		}).catch(res => {
			this.setState((prevState) => ({hasNotification: !prevState.hasNotification, errorMessage: res.response ? res.response.data.message : res.message}));
		}); 
	}

	handleAlertNotificationClosed() {
		this.setState((prevState) => ({hasNotification: !prevState.hasNotification, errorMessage: ''}));
	}

	render() {
		return (
			<div className="animated fadeIn"> FindById {this.props.routeParams.id}
				{this.state.hasNotification && (<Row><Col md="12"><AlertNotification isVisible={this.state.hasNotification} mainText={this.state.errorMessage} color={this.state.notificationColor} handleClosed={!this.state.fatalError ? this.handleAlertNotificationClosed : null} /></Col></Row>)}
				<CreateProduct
					cardTitle={' the child of product '}
					showParentProduct={true}
					allProducts={this.state.products}
					action={this.state.createProductAction}
					product={this.state.currentProduct}
					handleSubmit={this.handleCreateProductSubmit}
					handleReset={this.handleCreateProductReset}
					handleDelete={this.handleCreateProductDelete}
					/>
			</div>
		)
	}
}

export default ProductById;
