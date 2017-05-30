import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Card, CardBlock, CardHeader, CardFooter } from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';
import CustomTable from '../../components/CustomTable/CustomTable';
const _ = require('lodash');

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
        actionProperty: 'Add',
        endpoint: props.endpoint || {
            name: '',
            properties: []
        },
		currentProperty: {
            name: '',
            type: 'date'
        }
	};

    this.handleCurrentPropertyInputChange = this.handleCurrentPropertyInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.handleReset = this.handleReset.bind(this);
    this.handleEditProperty = this.handleEditProperty.bind(this);
	this.handleDeleteProperty = this.handleDeleteProperty.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
	this.handleEndpointNameChange = this.handleEndpointNameChange.bind(this);
	this.resetPropertyInput = this.resetPropertyInput.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState(() => ({
        endpoint: nextProps.endpoint || {
            name: '',
            properties: []
        },
        currentProperty: {
            name: '',
            type: 'date'
        }
    }))
  }

  handleEndpointNameChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
	this.setState(prevState => {
		    let newEndpoint = prevState.endpoint;
            newEndpoint['name'] = value;
            return {endpoint: newEndpoint};
		}
	);
  }

  handleCurrentPropertyInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => {
		let currProp = prevState.currentProperty;
		currProp[name] = value;
		return { currentProperty: currProp};
    });
  }

  handleSubmit(event){
      event.preventDefault();
      this.props.handleSubmit(this.state.endpoint);
  }

  handleReset(event){
      event.preventDefault();
      this.props.handleReset(this.state.endpoint);
  }

  handleEditProperty(id){
    this.setState((prevState) => ({
		actionProperty: 'Save',
        currentProperty: prevState.endpoint.properties.filter(prop => prop._id === id)[0]
    }));
  }

  handleDeleteProperty(propToDelete){
    this.setState((prevState) => {
		let newEndpoint = prevState.endpoint;
		newEndpoint.properties = newEndpoint.properties.filter(prop => prop.name !== propToDelete.columns[0]);
		return { endpoint: newEndpoint};
    });
  }

  resetPropertyInput() {
	this.setState(() => ({
		currentProperty: {
            name: '',
            type: 'date'
        },
		actionProperty: 'Add'
	}))
  }

  saveProperty(){
	  this.setState(prevState => {
		  let prevStateEndpoint = prevState.endpoint;
		  prevStateEndpoint.properties = [prevState.currentProperty, ...prevStateEndpoint.properties.filter(prop => prop.name !== prevState.currentProperty.name)];
		  return { endpoint: prevStateEndpoint};
	  });
	this.resetPropertyInput();
  }

  render() {
    return (
      <Row>
        <Col md="12">
            <Card>
                <CardHeader>
                    <strong>{this.props.action}</strong> a Product
                </CardHeader>
                <CardBlock>
                    <Form  className="form-horizontal">
                        <Row>
                            <Col md="1" />
                            <Col md="10">
                                <FormGroup>
                                    <label className="form-control-label" htmlFor="endpointName">Name</label>
                                    <input type="text" id="endpointName" name="endpointName" className="form-control" placeholder="Name for the endpoint" value={this.state.endpoint.name} onChange={this.handleEndpointNameChange}/>
                                    <span className="help-block">Please enter a unique endpoint name</span>
                                </FormGroup>
                            </Col>
                            <Col md="1" />
                        </Row>
                        <Row>
                            <Col md="1" />
                            <Col md="10">
                                <Card>
                                    <CardHeader>
                                        <i className="fa fa-align-justify"></i> Properties
                                    </CardHeader>
                                    <CardBlock>
                                        <Row>
                                            <Col md="12" style={{textAlign: 'center'}}>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="prop-name">Property Name</label>
                                                    <input type="text" id="prop-name" name="name" className="form-control" onChange={this.handleCurrentPropertyInputChange} placeholder="Name for the property" value={this.state.currentProperty.name}/>
                                                    <span className="help-block">Please enter a unique property name</span>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" style={{textAlign: 'center'}}>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="prop-type">Type</label>
                                                    <select className="form-control" id="prop-type" name="type" onChange={this.handleCurrentPropertyInputChange} value={this.state.currentProperty.type}>
                                                        <option value='string'>String</option>
                                                        <option value='int'>Integer</option>
                                                        <option value='decimal'>Decimal</option>
                                                        <option value='date'>Date</option>
                                                    </select>
                                                    <span className="help-block">Please enter a unique endpoint name</span>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" style={{textAlign: 'center'}}>
                                                <Button onClick={this.saveProperty} color="primary"><i className="fa fa-star"></i>&nbsp; {this.state.actionProperty}</Button>
												&nbsp;
												<Button onClick={this.resetPropertyInput} color="danger"><i className="fa fa-ban"></i>&nbsp; Reset</Button>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <CustomTable 
                                            headerColumns={['Name', 'Type']}
                                            onClickEdit={this.handleEditProperty}
											onClickDelete={this.handleDeleteProperty}
                                            rows={this.state.endpoint.properties.map(prop => ({_id: prop._id, columns: [prop.name, prop.type]}))} />
                                    </CardBlock>
                                    <CardFooter>
                                        <Button onClick={this.handleSubmit} disabled={!this.state.endpoint.name || this.state.endpoint.properties.length == 0} color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>&nbsp;
                                        <Button onClick={this.handleReset} type="reset" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                            <Col md="1" />
                        </Row>
                    </Form>
                </CardBlock>
            </Card>
        </Col>
    </Row>
    )
  }
}

export default CreateProduct;