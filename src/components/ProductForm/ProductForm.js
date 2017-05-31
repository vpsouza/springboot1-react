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

        this.setState((prevState) => ({currentProduct: { [name]: value } }));
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
					<select className="form-control" id="productParent" name="parent" onChange={this.handleInputChange} value={this.state.currentProduct.parent ? this.state.currentProduct.parent.id : ''}>
						<option value=''>Select</option>
						{this.props.allProducts.map(prod => (<option key={prod.id} value={prod.id}>{prod.name}</option>))}
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