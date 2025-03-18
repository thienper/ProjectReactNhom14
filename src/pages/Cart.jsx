// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
// eslint-disable-next-line no-unused-vars
import { ShoppingBag } from 'lucide-react';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Nike Air Max",
            size: "10",
            color: "Black",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            quantity: 1
        },
        {
            id: 2,
            name: "Adidas Ultra Boost",
            size: "9",
            color: "White",
            price: 159.99,
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
            quantity: 1
        },
        {
            id: 3,
            name: "New Balance 574",
            size: "8.5",
            color: "Gray",
            price: 84.99,
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
            quantity: 1
        }
    ]);

    const handleQuantityChange = (id, quantity) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: parseInt(quantity) } : item
        );
        setCartItems(updatedItems);
    };

    const handleRemoveItem = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="container my-5">
             <h2 className="mb-4 text-center" style={{ fontSize: '3rem', color: 'black', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', marginTop: '-40px' }}>Giỏ hàng của bạn</h2>

            <Row>
                {}
                <Col md={8}>
                    <Table responsive bordered hover className="align-middle bg-white shadow-sm rounded">
                        <thead className="table-primary">
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={item.image} alt={item.name} className="me-3 rounded" style={{ width: '60px', height: '60px' }} />
                                            <div>
                                                <h6 className="mb-0">{item.name}</h6>
                                                <small>Size: {item.size} | {item.color}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            style={{ width: '80px' }}
                                        />
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)}>
                                            🗑️
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                {}
                <Col md={4}>
                    <Card className="shadow-sm rounded bg-white">
                        <Card.Header className="bg-warning text-dark rounded-top">Tóm tắt đơn hàng</Card.Header>
                        <Card.Body>
                            <p><strong>Tạm tính:</strong> ${calculateSubtotal().toFixed(2)}</p>
                            <p><strong>Phí vận chuyển:</strong> $5.00</p>
                            <hr />
                            <h5>Tổng cộng: ${(calculateSubtotal() + 5).toFixed(2)}</h5>
                            <Button variant="success" className="w-100 mt-3">Tiến hành thanh toán</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CartPage;