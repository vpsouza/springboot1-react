import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    return (

      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-title">
              Menu
            </li>
			<li className="nav-item">
              <Link to={'/products'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i>Products</Link>
            </li>
			<li className="nav-item">
              <Link to={'/products/all'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i>Products All</Link>
            </li>
			<li className="nav-item">
              <Link to={'/products/children'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i>Children By Id </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
