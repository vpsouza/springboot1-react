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
import { browserHistory } from 'react-router';

class ProductsAll extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasError: false,
			fatalError: false,
			errorMessage: '',
			showCreateProduct: false,
			products: [],
			currentProduct: {
					name: '',
					properties: [],
					children: [],
					images: []
			},
			createProductAction: 'Create'
		};
		this.handleEditParentProductDetailsById = this
			.handleEditParentProductDetailsById
			.bind(this);
		this.handleDeleteParentProductById = this
			.handleDeleteParentProductById
			.bind(this);			
		this.handleCreateProductSubmit = this
			.handleCreateProductSubmit
			.bind(this);
		this.handleAlertNotificationClosed = this
			.handleAlertNotificationClosed
			.bind(this);
		this.handleCreateNewProduct = this
			.handleCreateNewProduct
			.bind(this);
		this.handleEditChildProduct = this
			.handleEditChildProduct
			.bind(this);
	}

	componentDidMount() {
		this.getAllProducts();
	}

	getAllProducts() {
		Api
			.getAllProducts()
			.then(res => {
				let rows = res
					.sort((a,b) => {
						if (a.name > b.name) {
							return 1;
						}
						if (a.name < b.name) {
							return -1;
						}
						// a must be equal to b
						return 0;
					})
					.map(product => ({
						id: product.id,
						name: product.name,
						description: product.description,
						children: product.children.sort((a,b) => {
							if (a.name > b.name) {
								return 1;
							}
							if (a.name < b.name) {
								return -1;
							}
							// a must be equal to b
							return 0;
						}),
						images: product.images.sort((a,b) => {
							if (a.type > b.type) {
								return 1;
							}
							if (a.type < b.type) {
								return -1;
							}
							// a must be equal to b
							return 0;
						}),
						columns: [product.name, product.description]
					}));
				this.setState(() => ({products: rows}));
			})
			.catch(res => {
				this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: res.response ? res.response.data.message : res.message, fatalError: !res.response ? true : false}));
			}); 
	}

	handleCreateProductSubmit(product) {
		let service = product._id ? Api.updateEndpoint : Api.saveEndpoint;
		service(product).then(newEndpoint => {
			this.getAllProducts();
		})
		.catch(res => {
			this.setState((prevState) => ({hasError: true, errorMessage: res.response ? res.response.data.message : res.message}));
		}); 
	}

	handleEditParentProductDetailsById(id) {
		Api.getProductByIdAll(id)
			.then(res => {
				this.setState((prevState) => ({
					showCreateProduct: true,
					createProductAction: 'Edit',
					currentProduct: res
				}));
			})
	}

	handleDeleteParentProductById(product) {
		Api.deleteEndpoint(product._id.toString()).then(res => {
			this.setState((prevState) => ({
				showCreateProduct: false,
				createProductAction: 'Create',
				currentProduct: null
			}));
			this.getAllProducts();
		}).catch(res => {
			this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: res.response ? res.response.data.message : res.message}));
		}); 
	}

	handleCreateNewProduct() {
		this.setState((prevState) => ({
			showCreateProduct: !prevState.showCreateProduct,
			createProductAction: 'Create',
			currentProduct: {
				name: '',
				properties: [],
				children: [],
				images: []
			}
		}))
	}

	handleAlertNotificationClosed() {
		this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: ''}));
	}

	handleEditChildProduct(id){
		this.props.router.push('/product/' + id);
	}

	render() {
		return (
			<div className="animated fadeIn">
				{this.state.hasError && (<Row><Col md="12"><AlertNotification isVisible={this.state.hasError} mainText={this.state.errorMessage} color="danger" handleClosed={!this.state.fatalError ? this.handleAlertNotificationClosed : null} /></Col></Row>)}
				<ProductList 
					handleEditProduct={this.handleEditParentProductDetailsById}
					handleDeleteProduct={this.handleDeleteParentProductById}
					hasError={this.state.hasError}
					products={this.state.products}>
					<Button type="button" onClick={this.handleCreateNewProduct} color="primary">
						<i className="fa fa-star"></i>&nbsp; {!this.state.showCreateProduct
							? 'Create a new product'
							: 'Cancel the creation of a new product'}
					</Button>
				</ProductList>
				{!this.state.hasError && this.state.showCreateProduct && 
					<CreateProduct
						showParentProduct={true}
						allProducts={this.state.products}
						action={this.state.createProductAction}
						product={this.state.currentProduct}
						handleEditChildProduct={this.handleEditChildProduct}
						handleSubmit={this.handleCreateProductSubmit}/>}
			</div>
		)
	}
}

export default ProductsAll;
