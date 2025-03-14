import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavMenu = () => {
    return (
        <Nav className="ms-auto align-items-center">
            {/* Home */}
            <Nav.Link as={Link} to="/" className="text-dark">
                Home
            </Nav.Link>

            {/* Men's Shoes Dropdown */}
            <NavDropdown title="Men's Shoes" id="men-dropdown">
                <NavDropdown.Item as={Link} to="/mens-sports">Men's Sports</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/mens-sandals">Men's Sandals</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/mens-leather">Men's Leather</NavDropdown.Item>
            </NavDropdown>

            {/* Women's Shoes Dropdown */}
            <NavDropdown title="Women's Shoes" id="women-dropdown">
                <NavDropdown.Item as={Link} to="/womens-sports">Women's Sports</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/womens-sandals">Women's Sandals</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/womens-heels">Women's Heels</NavDropdown.Item>
            </NavDropdown>

            {/* Blog */}
            <Nav.Link as={Link} to="/blog" className="text-dark">
                Blog
            </Nav.Link>

            {/* Contact */}
            <Nav.Link as={Link} to="/contact" className="text-dark">
                Contact
            </Nav.Link>
        </Nav>
    );
};

export default NavMenu;
