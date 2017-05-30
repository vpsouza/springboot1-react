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

const ProductList = ({products, hasError, handleEditEndpoint, handleDeleteEndpoint, children}) => (
    <Row>
        <Col lg="12">
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Availble Endpoints
                </CardHeader>
                <CardBlock>
                    {products.length > 0 ? 
                        <div>
                            <CustomTable
                                headerColumns={['Name', 'Path']}
                                onClickEdit={handleEditEndpoint}
                                onClickDelete={handleDeleteEndpoint}
                                rows={products}/>
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

export default ProductList;