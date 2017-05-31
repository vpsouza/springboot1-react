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
import PropTypes from 'prop-types';

const ProductList = ({products, tableColumns, hasError, handleEditProduct, handleDeleteProduct, children}) => (
    <Row>
        <Col lg="12">
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    Availble Products
                </CardHeader>
                <CardBlock>
                    {products.length > 0 ? 
                        <div>
                            <CustomTable
                                headerColumns={tableColumns}
                                onClickEdit={handleEditProduct}
                                onClickDelete={handleDeleteProduct}
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
);

ProductList.propTypes = {
	products: PropTypes.array.isRequired, 
	hasError: PropTypes.bool.isRequired, 
	handleEditProduct: PropTypes.func, 
	handleDeleteProduct: PropTypes.func,
	tableColumns: PropTypes.array.isRequired
};

ProductList.defaultProps = {
	products: [], 
	hasError: false,
	tableColumns: ['Name', 'Description']
};

export default ProductList;