import React, { Component } from 'react';
import {
		Button,
		ButtonDropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		Row,
		Col,
		Card,
		CardBlock,
		CardHeader,
		CardFooter
} from 'reactstrap';

import CustomTable from '../CustomTable/CustomTable';
import Loading from '../Loading/Loading';

const EndpointList = ({endpoints, hasError, handleEditEndpoint, handleDeleteEndpoint, children}) => (
    <Row>
        <Col lg="12">
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Availble Endpoints
                </CardHeader>
                <CardBlock>
                    {endpoints.length > 0 ? 
                        <div>
                            <CustomTable
                                headerColumns={['Name', 'Path']}
                                onClickEdit={handleEditEndpoint}
                                onClickDelete={handleDeleteEndpoint}
                                rows={endpoints}/>
                            <Row>
                                <Col
                                    md="12"
                                    style={{
                                    textAlign: 'center'
                                }}>
                                {children}
                                </Col>
                            </Row>
                        </div>
                        : !hasError && 
                        <Loading />
                    }
                </CardBlock>
            </Card>
        </Col>
    </Row>
)

EndpointList

export default EndpointList;