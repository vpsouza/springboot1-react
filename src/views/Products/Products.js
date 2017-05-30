import React, {Component} from 'react';
import {
		Button,
		Row,
		Col
} from 'reactstrap';
import CreateProduct from './CreateProduct';
import Api from '../../api';
import ProductList from '../../components/ProductList';
import AlertNotification from '../../components/AlertNotification';

class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasError: false,
			fatalError: false,
			errorMessage: '',
			showCreateProduct: false,
			products: [],
			currentEndpoint: {
					name: '',
					properties: []
			},
			createEndpointAction: 'Create'
		};
		this.handleCreateNewEndpoint = this
			.handleCreateNewEndpoint
			.bind(this);
		this.handleEditEndpoint = this
			.handleEditEndpoint
			.bind(this);
		this.handleDeleteEndpoint = this
			.handleDeleteEndpoint
			.bind(this);			
		this.handleCreateProductSubmit = this
			.handleCreateProductSubmit
			.bind(this);
		this.handleAlertNotificationClosed = this
			.handleAlertNotificationClosed
			.bind(this);
	}

	componentDidMount() {
		this.getAllProducts();
	}

	getAllProducts() {
		Api
			.getProducts()
			.then(res => {
				let rows = res.map(product => ({
					id: product.id,
					name: product.name,
					description: product.description,
					children: product.children,
					images: product.images,
					columns: [product.name, product.description]
				}));
				this.setState(() => ({products: rows}))
			})
			.catch(res => {
				this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: res.response ? res.response.data.message : res.message, fatalError: !res.response ? true : false}));
			}); 
	}

	handleCreateNewEndpoint() {
		this.setState((prevState) => ({
			showCreateProduct: !prevState.showCreateProduct,
			createEndpointAction: 'Create',
			currentEndpoint: null
		}));
	}

	handleCreateProductSubmit(endpoint) {
		let service = endpoint._id ? Api.updateEndpoint : Api.saveEndpoint;
		service(endpoint).then(newEndpoint => {
			this.handleCreateNewEndpoint();
			this.getAllProducts();
		})
		.catch(res => {
			this.setState((prevState) => ({hasError: true, errorMessage: res.response ? res.response.data.message : res.message}));
		}); 
	}

	handleEditEndpoint(id) {
		this.setState((prevState) => ({
			showCreateProduct: true,
			createEndpointAction: 'Edit',
			currentEndpoint: prevState
				.products
				.filter(elm => elm._id === id)[0]
		}));
	}

	handleDeleteEndpoint(endpoint) {
		Api.deleteEndpoint(endpoint._id.toString()).then(res => {
			this.setState((prevState) => ({
				showCreateProduct: false,
				createEndpointAction: 'Create',
				currentEndpoint: null
			}));
			this.getAllProducts();
		}).catch(res => {
			this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: res.response ? res.response.data.message : res.message}));
		}); 
	}

	handleAlertNotificationClosed() {
		this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: ''}));
	}

	render() {
		return (
			<div className="animated fadeIn">
				{this.state.hasError && (<Row><Col md="12"><AlertNotification isVisible={this.state.hasError} mainText={this.state.errorMessage} color="danger" handleClosed={!this.state.fatalError ? this.handleAlertNotificationClosed : null} /></Col></Row>)}
				<ProductList 
					handleEditEndpoint={this.handleEditEndpoint}
					handleDeleteEndpoint={this.handleDeleteEndpoint}
					hasError={this.state.hasError}
					products={this.state.products}>
					<Button type="button" onClick={this.handleCreateNewEndpoint} color="primary">
						<i className="fa fa-star"></i>&nbsp; {!this.state.showCreateProduct
							? 'Create a new product'
							: 'Cancel the creation of a new product'}
					</Button>
				</ProductList>
				{!this.state.hasError && this.state.showCreateProduct && 
					<CreateProduct
						action={this.state.createEndpointAction}
						endpoint={this.state.currentEndpoint}
						handleSubmit={this.handleCreateProductSubmit}
						handleReset={this.handleCreateNewEndpoint}/>}
			</div>
		)
	}
}

export default Products;
