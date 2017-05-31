import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Card, CardBlock, CardHeader, CardFooter } from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';
import CustomTable from '../CustomTable/';
import ProductForm from '../ProductForm/';
import PropTypes from 'prop-types';

const _ = require('lodash');

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
        actionProperty: 'Add',
		currentProduct: props.product
	};

    this.handleSubmit = this.handleSubmit.bind(this);
	this.handleProductFormChange = this.handleProductFormChange.bind(this);
	this.handleReset = this.handleReset.bind(this);
    this.handleEditChildProduct = this.handleEditChildProduct.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
	this.resetProductInput = this.resetProductInput.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState(() => ({
		allProducts: nextProps.allProducts,
        currentProduct: nextProps.product || {
            name: '',
            description: '',
            children: [],
            images: []
        }
    }))
  }

  handleProductFormChange(currentProduct){
		this.setState(() => ({ 'currentProduct': currentProduct }));
  }

  handleSubmit(event){
      event.preventDefault();
      this.props.handleSubmit(this.state.currentProduct);
  }

  handleReset(event){
      event.preventDefault();
      this.props.handleReset(this.state.currentProduct);
  }

  handleEditChildProduct(id){
    this.props.handleEditChildProduct(id);
  }

  resetProductInput() {
	this.setState(() => ({
		currentProduct: {
            name: '',
            description: '',
            children: [],
            images: []
        },
		actionProperty: 'Add'
	}))
  }

  saveProduct(){
	  this.setState(prevState => {
		  let prevStateEndpoint = prevState.endpoint;
		  prevStateEndpoint.properties = [prevState.currentProperty, ...prevStateEndpoint.properties.filter(prop => prop.name !== prevState.currentProperty.name)];
		  return { endpoint: prevStateEndpoint};
	  });
	this.resetProductInput();
  }

  render() {
    return (
      <Row>
        <Col lg="12">
            <Card>
                <CardHeader>
                    <strong>{this.props.action}</strong>{this.props.cardTitle}
                </CardHeader>
                <CardBlock>
					<ProductForm 
						allProducts={this.props.allProducts}
						currentProduct={this.state.currentProduct}
						showParent={this.props.showParentProduct}
						notifyChange={this.handleProductFormChange} />
						{this.state.currentProduct.children
						 && this.state.currentProduct.children.length > 0 &&
							<Card>
								<CardHeader>
									<i className="fa fa-align-justify"></i> Children
								</CardHeader>
								<CardBlock>
									<CustomTable 
										headerColumns={['Name', 'Type']}
										onClickEdit={this.handleEditChildProduct}
										rows={this.state.currentProduct.children.map(prod => ({id: prod.id, columns: [prod.name, prod.description]}))} />
								</CardBlock>
							</Card>
						}
                </CardBlock>
				<CardFooter>
					<Button onClick={this.handleSubmit} color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>&nbsp;
					{this.props.handleDelete && <Button onClick={this.props.handleDelete} color="primary"><i className="fa fa-trash"></i> Delete</Button>}&nbsp;
					<Button onClick={this.handleReset} type="reset" color="danger"><i className="fa fa-ban"></i> Reset</Button>
				</CardFooter>
            </Card>
        </Col>
    </Row>
    )
  }
}

CreateProduct.propTypes = {
	product: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func,
	handleReset: PropTypes.func,
	handleDelete: PropTypes.func,
	handleEditChildProduct: PropTypes.func,
	action: PropTypes.string.isRequired,
	showParentProduct: PropTypes.bool.isRequired,
	allProducts: PropTypes.array,
	cardTitle: PropTypes.string.isRequired
}

CreateProduct.defaultProps = {
	action: 'Create',
	showParentProduct: false,
	product: {
		name: '',
		description: '',
		children: [],
		images: []
	},
	cardTitle: 'a Product'
}

export default CreateProduct;