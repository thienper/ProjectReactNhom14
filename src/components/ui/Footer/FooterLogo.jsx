import React from 'react';
import { Stack } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa';

const FooterLogo = () => {
    return (
        <div>
            <Stack direction="horizontal" gap={3} className="mb-3">
                <div className="bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <h5 className="mb-0 text-white">SoleStyle</h5>
            </Stack>

            <p className=" small mb-3">
                Premium footwear for every style and occasion. <br />
                Quality shoes that combine comfort and fashion.
            </p>

            <Stack direction="horizontal" gap={3}>
                <a href="#" className="text-light fs-5"><FaFacebookF /></a>
                <a href="#" className="text-light fs-5"><FaTwitter /></a>
                <a href="#" className="text-light fs-5"><FaInstagram /></a>
                <a href="#" className="text-light fs-5"><FaPinterestP /></a>
            </Stack>
        </div>
    );
};

export default FooterLogo;
