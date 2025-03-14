import React from 'react';
import { NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../../../assets/images/logo.png";

const Logo = () => {
    return (
        <NavbarBrand as={Link} to="/" className="d-flex align-items-center">
            <img
                src={logo}
                alt="Logo"
                style={{ width: '30px', height: '30px', marginRight: '10px' }}
            />
            <span className="fw-bold fs-4">SoleStyle</span>
        </NavbarBrand>
    );
};

export default Logo;
