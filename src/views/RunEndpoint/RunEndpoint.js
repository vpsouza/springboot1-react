import React, {Component} from 'react';
import {
		Button,
		Row,
		Col
} from 'reactstrap';
import Api from '../../api';
import EndpointList from '../../components/EndpointList/EndpointList';
import AlertNotification from '../../components/AlertNotification/AlertNotification';
import ExecuteEndpoint from './ExecuteEndpoint';

class RunEndpoint extends Component {
    constructor(props) {
		super(props);

		this.state = {
			hasError: false,
			fatalError: false,
			errorMessage: '',
			showRunEndpoint: false,
			endpoints: [],
			currentEndpoint: {
					name: '',
					properties: []
			}
		};
		this.handleEditEndpoint = this
			.handleEditEndpoint
			.bind(this);
		this.handleAlertNotificationClosed = this
			.handleAlertNotificationClosed
			.bind(this);
	}

    componentDidMount() {
		this.getAllEndpoints();
	}

	getAllEndpoints() {
		Api
			.getEndpoints()
			.then(res => {
				let rows = res.map(endpoint => ({
					_id: endpoint._id,
					name: endpoint.name,
					properties: endpoint.properties,
					columns: [
						endpoint.name, <a target="balnk" href={Api.getBaseEndpointURL() + '/api/' + endpoint.name}>{'/' + endpoint.name}</a>
					]
				}));
				this.setState(() => ({endpoints: rows}))
			})
			.catch(res => {
				this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: res.response ? res.response.data.message : res.message, fatalError: !res.response ? true : false}));
			}); 
	}

    handleEditEndpoint(id) {
		this.setState((prevState) => ({
			showRunEndpoint: true,
			createEndpointAction: 'Edit',
			currentEndpoint: prevState
				.endpoints
				.filter(elm => elm._id === id)[0]
		}));
	}

    handleAlertNotificationClosed() {
		this.setState((prevState) => ({hasError: !prevState.hasError, errorMessage: ''}));
	}
    
    render() {
        return (
            <div className="animated fadeIn">
				{this.state.hasError && (<Row><Col md="12"><AlertNotification isVisible={this.state.hasError} mainText={this.state.errorMessage} color="danger" handleClosed={!this.state.fatalError ? this.handleAlertNotificationClosed : null} /></Col></Row>)}
				<EndpointList 
					handleEditEndpoint={this.handleEditEndpoint}
					hasError={this.state.hasError}
					endpoints={this.state.endpoints}>
					
				</EndpointList>
				{this.state.showRunEndpoint && 
					<ExecuteEndpoint />}
			</div>
        );
    }
}

export default RunEndpoint;