import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <Fragment>
                {/* Logo */}
                <Link className="navbar-brand" to="/"> <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="logo" /> </Link>
                {/* Menu */}
                <ul className="navbar-nav">
                   
                    <li className="menu-item">
                    <Link to="/">Listings</Link>
                    
                    </li>
                    <li className="menu-item">
                    <Link to="/profile">Profile</Link>
                                
                    </li>
                    
                </ul>
            </Fragment>
        );
    }
}

export default Menu;