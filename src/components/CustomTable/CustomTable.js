import React, {Component} from 'react';
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
import {Form, FormGroup} from 'reactstrap';
import PropTypes from 'prop-types';

const CustomTable = ({headerColumns, onClickEdit, onClickDelete, rows}) => (
    <table className="table">
        <thead>
            <tr>
                {headerColumns.map(header => (
                    <th key={header}>{header}</th>
                ))}
                <th style={{
                    width: '5%'
                }}></th>
                <th style={{
                    width: '5%'
                }}></th>
            </tr>
        </thead>
        <tbody>
            {rows.map((row, idx) => (
                <tr key={idx}>
                    {row
                        .columns
                        .map((column, idx) => (
                            <td key={idx}>{column}</td>
                        ))}
                    <td>{onClickEdit && <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onClickEdit.bind(null, row._id)}>
                            <i className="fa fa-edit"></i>
                        </button>}</td>
                    <td>{onClickDelete && <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onClickDelete.bind(null, row)}>
                            <i className="fa fa-close"></i>
                        </button>}</td>
                </tr>
            ))
}
        </tbody>
    </table>
);

CustomTable.propTypes = {
    headerColumns: PropTypes.array.isRequired,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    rows: PropTypes.array.isRequired
}

export default CustomTable;