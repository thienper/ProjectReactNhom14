import React from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import mastercard from '../../../assets/images/mastercard.png';
import paypal from '../../../assets/images/paypal.png';
import visa from '../../../assets/images/visa.png';

const FooterBottom = () => {
    return (
        <div className="border-top border-secondary pt-3 pb-2">
            <Row className="align-items-center">
                <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
                    <small className="text-muted">&copy; {new Date().getFullYear()} SoleStyle. All rights reserved.</small>
                </Col>
                <Col md={6}>
                    <Stack direction="horizontal" gap={3} className="justify-content-center justify-content-md-end">
                        <img src={visa} alt="Visa" style={{ height: '24px' }} />
                        <img src={mastercard} alt="Mastercard" style={{ height: '24px' }} />
                        <img src={paypal} alt="PayPal" style={{ height: '24px' }} />
                    </Stack>
                </Col>
            </Row>
        </div>
    );
};

export default FooterBottom;
