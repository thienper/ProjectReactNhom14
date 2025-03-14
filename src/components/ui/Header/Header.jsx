import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import AccountIcon from './AccountIcon';
import CartIcon from './CartIcon';
import Logo from './Logo';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
            <Container>
                <Logo />
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar" className="justify-content-between">
                    <NavMenu />
                    <div className="d-flex align-items-center">
                        <SearchBar />
                        <CartIcon />
                        <AccountIcon />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
