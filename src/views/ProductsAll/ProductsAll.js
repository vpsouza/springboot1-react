import React, {Component} from 'react';
import {
		Button,
		Row,
		Col,
		Modal, ModalHeader, ModalBody, ModalFooter
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
			hasNotification: false,
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
			createProductAction: 'Create',
			modalConfirmDelete: false,
			modalConfirmDeleteMessage: ''
		};
		this.handleSelectProductDetailsById = this
			.handleSelectProductDetailsById
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
		this.handleBtnCreateNewProduct = this
			.handleBtnCreateNewProduct
			.bind(this);
		this.handleEditChildProduct = this
			.handleEditChildProduct
			.bind(this);
		this.toggleConfirmDelete = this
			.toggleConfirmDelete
			.bind(this);
		this.doDeleteProduct = this
			.doDeleteProduct
			.bind(this);
	}

	componentDidMount() {
		this.getAllProducts();
	}

	getAllProducts() {
		Api
			.getProducts()
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
				this.setState((prevState) => ({hasNotification: !prevState.hasNotification, errorMessage: res.response ? res.response.data.message : res.message, fatalError: !res.response ? true : false}));
			}); 
	}

	handleCreateProductSubmit(product) {
		let service = product.id ? Api.updateProduct : Api.saveProduct;
		service(product).then(newProduct => {
			this.getAllProducts();
			this.handleBtnCreateNewProduct();
			this.setState((prevState) => ({hasNotification: !prevState.hasNotification, errorMessage: 'Product ' + product.name + ' saved!', notificationColor: 'success'}));
		})
		.catch(res => {
			this.setState((prevState) => ({hasNotification: true, errorMessage: res.response ? res.response.data.message : res.message, notificationColor: 'danger'}));
		}); 
	}

	handleSelectProductDetailsById(id) {
		Api.getProductById(id)
			.then(res => {
				this.setState((prevState) => ({
					showCreateProduct: true,
					createProductAction: 'Edit',
					currentProduct: res
				}));
			})
	}

	handleDeleteParentProductById(product) {
		this.setState(() => ({
			showCreateProduct: false,
			createProductAction: 'Create',
			currentProduct: product,
			modalConfirmDelete: !this.state.modalConfirmDelete,
			modalConfirmDeleteMessage: 'Confirm deletion of the product ' + product.name + '?' + (product.children.length > 0 ? ' Note that this product children will be deleted too.' : '')
		}));
	}

	doDeleteProduct(){
		Api.deleteProduct(this.state.currentProduct.id).then(res => {
			this.getProducts();
			this.setState((prevState) => ({showCreateProduct: false,
			createProductAction: 'Create', currentProduct: {
				name: '',
				properties: [],
				children: [],
				images: []
			}, hasNotification: !prevState.hasNotification, errorMessage: 'Product ' + this.state.currentProduct.name + ' deleted!', notificationColor: 'success'}));
			this.toggleConfirmDelete();
		}).catch(res => {
			this.setState((prevState) => ({hasNotification: !prevState.hasNotification, errorMessage: res.response ? res.response.data.message : res.message, notificationColor: 'danger'}));
			this.toggleConfirmDelete();
		});
	}

	handleBtnCreateNewProduct() {
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
		this.setState(() => ({hasNotification: false, errorMessage: '', notificationColor: ''}));
	}

	handleEditChildProduct(id){
		this.props.router.push('/product/' + id);
	}

	toggleConfirmDelete() {
		this.setState({
			modalConfirmDelete: !this.state.modalConfirmDelete,
			currentProduct: {
					name: '',
					properties: [],
					children: [],
					images: []
			}
		});
	}

	render() {
		return (
			<div className="animated fadeIn">
				{this.state.hasNotification && (<Row><Col md="12"><AlertNotification isVisible={this.state.hasNotification} mainText={this.state.errorMessage} color={this.state.notificationColor} handleClosed={!this.state.fatalError ? this.handleAlertNotificationClosed : null} /></Col></Row>)}
				<Modal isOpen={this.state.modalConfirmDelete} toggle={this.toggleConfirmDelete} className={this.props.className}>
				<ModalHeader toggle={this.toggleConfirmDelete}>Confirm delete operation</ModalHeader>
				<ModalBody>{this.state.modalConfirmDeleteMessage}</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.doDeleteProduct}>Delete</Button>{' '}
					<Button color="secondary" onClick={this.toggleConfirmDelete}>Cancel</Button>
				</ModalFooter>
				</Modal>
				<ProductList 
					handleEditProduct={this.handleSelectProductDetailsById}
					handleDeleteProduct={this.handleDeleteParentProductById}
					hasNotification={this.state.hasNotification}
					products={this.state.products}>
					<Button type="button" onClick={this.handleBtnCreateNewProduct} color="primary">
						<i className="fa fa-star"></i>&nbsp; {!this.state.showCreateProduct
							? 'Create a new product'
							: 'Cancel the creation of a new product'}
					</Button>
				</ProductList>
				{!this.state.hasNotification && this.state.showCreateProduct && 
					<CreateProduct
						showParentProduct={true}
						allProducts={this.state.products}
						action={this.state.createProductAction}
						product={this.state.currentProduct}
						handleEditChildProduct={this.handleEditChildProduct}
						handleSubmit={this.handleCreateProductSubmit}
						handleReset={this.handleBtnCreateNewProduct}/>}
			</div>
		)
	}
}

export default ProductsAll;
