import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Card, CardBlock, CardHeader, CardFooter, Input } from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';

class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProduct: props.currentProduct
        };

        this.handleInputChange = this.handleInputChange.bind(this);
		this.hadleChangeParent = this.hadleChangeParent.bind(this);
    }

	componentWillReceiveProps(nextProps){
		this.setState(() => ({
			currentProduct: nextProps.currentProduct || {
				name: '',
				description: '',
				children: [],
				images: []
			}
		}))
	}

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((prevState) => {
			let oldCurrProduct = prevState.currentProduct;
			oldCurrProduct[name] = value;
			return {currentProduct: oldCurrProduct};
		});
		this.notifyChange();
    }

	hadleChangeParent(event){
		const target = event.target;
        const value = target.value;
        this.setState((prevState) => {
			let oldCurrProduct = prevState.currentProduct;
			oldCurrProduct['parent'] = Object.assign({}, this.props.allProducts.filter(p => p.id == value)[0]);
			//oldCurrProduct['parent'].children.splice(0);
			//oldCurrProduct['parent'].images.splice(0);
			return {currentProduct: oldCurrProduct};
		});
		this.notifyChange();
	}

    notifyChange(){
        this.props.notifyChange(this.state.currentProduct);
    }

    render() {
        return (
            <Form className="form-horizontal">
				<FormGroup>
					<label className="form-control-label" htmlFor="productName">Name</label>
					<input type="text" id="productName" name="name" className="form-control" placeholder="Name for the product" value={this.state.currentProduct.name} onChange={this.handleInputChange}/>
					<span className="help-block">Please enter a unique product name</span>
				</FormGroup>
				<FormGroup>
					<label className="form-control-label" htmlFor="productDescription">Description</label>
					<Input rows={4} type="textarea" id="productDescription" name="description"  placeholder="Description for the product" value={this.state.currentProduct.description} onChange={this.handleInputChange} />
					<span className="help-block">Please enter a product description</span>
				</FormGroup>
				{this.props.showParent && <FormGroup>
					<label className="form-control-label" htmlFor="productParent">Parent</label>
					<select className="form-control" id="productParent" name="parent" onChange={this.hadleChangeParent} value={this.state.currentProduct.parent ? this.state.currentProduct.parent.id : ''}>
						<option>Select</option>
						{this.props.allProducts.filter(elm => elm.id != this.state.currentProduct.id || !this.state.currentProduct.id ).map(prod => (<option key={prod.id} value={prod.id}>{prod.name}</option>))}
					</select>
				</FormGroup>}
            </Form>
        );
    }
}

ProductForm.propTypes = {
	currentProduct: PropTypes.object.isRequired,
	showParent: PropTypes.bool.isRequired,
	notifyChange: PropTypes.func.isRequired,
	allProducts: PropTypes.array.isRequired
}

ProductForm.defaultProps = {
	currentProduct: {
		name: '',
		description: '',
		children: [],
		images: []
	},
	allProducts: [],
	showParent: false
}

export default ProductForm;