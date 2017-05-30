import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class AlertNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: this.props.isVisible
    };

    this.onDismiss = this.onDismiss.bind(this);
	this.doTimeoutToClose = this.doTimeoutToClose.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isVisible){
		this.doTimeoutToClose();
	}
  }

  componentDidMount() {
	  this.state.visible && this.doTimeoutToClose();
  }

  doTimeoutToClose() {
	this.timerID = setTimeout(
      () => this.onDismiss(),
      this.props.timeToClose
    );
  }

  onDismiss() {
    this.setState(() => ({ visible: false }));
	if(this.props.handleClosed){
		this.props.handleClosed();
	}
  }

  render() {
    return (
		<Alert transitionEnterTimeout={750} transitionLeaveTimeout={750} color={this.props.color} isOpen={this.state.visible}>
      		<strong>{this.props.preText}</strong>{this.props.mainText}
    	</Alert>
    );
  }
}

AlertNotification.propTypes = {
	color: PropTypes.string.isRequired, 
	mainText: PropTypes.string.isRequired, 
	preText: PropTypes.string,
	isVisible: PropTypes.bool.isRequired,
	isCloseAuto: PropTypes.bool.isRequired,
	timeToClose: PropTypes.number.isRequired,
	handleClosed: PropTypes.func
}

AlertNotification.defaultProps = {
	color: 'info',
	mainText: ' ',
	isVisible: false,
	isCloseAuto: true,
	timeToClose: 4000
}

export default AlertNotification;