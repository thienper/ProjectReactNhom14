import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // import navigate

const CartIcon = () => {
    const navigate = useNavigate(); // khởi tạo navigate function

    const handleClick = () => {
        navigate('/cart'); // điều hướng tới trang giỏ hàng
    };

    return (
        <div
            className="position-relative ms-3"
            style={{ cursor: 'pointer' }}
            onClick={handleClick} // thêm handler
        >
            <ShoppingCart size={24} />
            <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
            >
                3
            </Badge>
        </div>
    );
};

export default CartIcon;
