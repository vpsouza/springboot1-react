import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Card, CardBlock, CardHeader, CardFooter } from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';

class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProduct: props.currentProduct || {
                name: '',
                description: ''
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
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
            <Row>
                <Col md="1" />
                <Col md="10">
                    <FormGroup>
                        <label className="form-control-label" htmlFor="productName">Name</label>
                        <input type="text" id="productName" name="name" className="form-control" placeholder="Name for the product" value={this.state.endpoint.name} onChange={this.handleInputChange}/>
                        <span className="help-block">Please enter a unique endpoint name</span>
                    </FormGroup>
                    <FormGroup>
                        <label className="form-control-label" htmlFor="productDescription">Description</label>
                        <input type="text" id="productDescription" name="description" className="form-control" placeholder="Description for the product" value={this.state.endpoint.name} onChange={this.handleInputChange}/>
                        <span className="help-block">Please enter a unique endpoint name</span>
                    </FormGroup>
                </Col>
                <Col md="1" />
            </Row>
        );
    }
}

export default ProductForm;