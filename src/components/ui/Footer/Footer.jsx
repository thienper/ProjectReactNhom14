import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FooterBottom from './FooterBottom';
import FooterColumn from './FooterColumn';
import FooterLogo from './FooterLogo';

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 text-white">
            <Container>
                <Row className="mb-5">
                    <Col xs={12} md={4}>
                        <FooterLogo />
                    </Col>
                    <Col xs={6} md={2}>
                        <FooterColumn
                            title="Shop"
                            links={[
                                { label: "Men's Shoes", href: "#" },
                                { label: "Women's Shoes", href: "#" },
                                { label: "New Arrivals", href: "#" },
                                { label: "Sale", href: "#" },
                                { label: "Collections", href: "#" },
                            ]}
                        />
                    </Col>
                    <Col xs={6} md={3}>
                        <FooterColumn
                            title="Company"
                            links={[
                                { label: "About Us", href: "#" },
                                { label: "Contact", href: "#" },
                                { label: "Careers", href: "#" },
                                { label: "Blog", href: "#" },
                                { label: "Store Locator", href: "#" },
                            ]}
                        />
                    </Col>
                    <Col xs={12} md={3}>
                        <FooterColumn
                            title="Customer Service"
                            links={[
                                { label: "Help Center", href: "#" },
                                { label: "Shipping & Returns", href: "#" },
                                { label: "Size Guide", href: "#" },
                                { label: "Track My Order", href: "#" },
                                { label: "Privacy Policy", href: "#" },
                            ]}
                        />
                    </Col>
                </Row>

                {/* Bottom Footer */}
                <FooterBottom />
            </Container>
        </footer>
    );
};

export default Footer;
