import React from 'react';
import { ListGroup } from 'react-bootstrap';

const FooterColumn = ({ title, links }) => {
    return (
        <div className="mb-4">
            <h6 className="text-white mb-3">{title}</h6>
            <ListGroup variant="flush">
                {links.map((link, index) => (
                    <ListGroup.Item key={index} className=" p-0 bg-dark  border-0">
                        <a href={link.href} className="chu-trang small text-decoration-none">
                            {link.label}
                        </a>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default FooterColumn;
