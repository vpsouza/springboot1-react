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
			hasError: false,
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
				this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: res.response ? res.response.data.message : res.message, fatalError: !res.response ? true : false}));
			}); 
	}

	handleCreateProductSubmit(product) {
		let service = product._id ? Api.updateEndpoint : Api.saveEndpoint;
		service(product).then(newEndpoint => {
			this.getProductById();
		})
		.catch(res => {
			this.setState((prevState) => ({hasError: true, errorMessage: res.response ? res.response.data.message : res.message}));
		}); 
	}

	handleCreateProductReset() {
		browserHistory.goBack();
	}

	handleCreateProductDelete() {
		Api.deleteProduct(this.state.currentProduct.id).then(res => {
			this.props.router.replace('products/all');
		}).catch(res => {
			this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: res.response ? res.response.data.message : res.message}));
		}); 
	}

	handleAlertNotificationClosed() {
		this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: ''}));
	}

	render() {
		return (
			<div className="animated fadeIn"> FindById {this.props.routeParams.id}
				{this.state.hasError && (<Row><Col md="12"><AlertNotification isVisible={this.state.hasError} mainText={this.state.errorMessage} color="danger" handleClosed={!this.state.fatalError ? this.handleAlertNotificationClosed : null} /></Col></Row>)}
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
				{/* <ProductList 
					handleEditProduct={this.handleEditProduct}
					handleCreateProductDelete={this.handleCreateProductDelete}
					hasError={this.state.hasError}
					products={this.state.products}>
					<Button type="button" onClick={this.handleCreateNewProduct} color="primary">
						<i className="fa fa-star"></i>&nbsp; {!this.state.showCreateProduct
							? 'Create a new product'
							: 'Cancel the creation of a new product'}
					</Button>
				</ProductList> */}
				{/* !this.state.hasError && this.state.showCreateProduct && 
					<CreateProduct
						showParentProduct={true}
						allProducts={this.state.products}
						action={this.state.createProductAction}
						product={this.state.currentProduct}
						handleSubmit={this.handleCreateProductSubmit}/>*/}
			</div>
		)
	}
}

export default ProductById;
