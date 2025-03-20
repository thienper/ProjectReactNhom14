import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/ContextAPI';

const Checkout = () => {
    const { orderList, setOrderList } = useOrder();
    const navigate = useNavigate();

    // Lấy thông tin user từ localStorage (đã đăng nhập)
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Thông tin giao hàng (auto fill nếu có user)
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (user) {
            setCustomerName(user.name || '');
            setPhoneNumber(user.phone || '');
            setAddress(user.address || '');
        }
    }, [user]);

    const shippingFee = 5;

    const calculateSubtotal = () => {
        return orderList.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handlePlaceOrder = () => {
        // Validate thông tin
        if (!customerName.trim()) {
            alert('Vui lòng nhập tên người nhận!');
            return;
        }
        if (!phoneNumber.trim() || !/^\d{10,11}$/.test(phoneNumber)) {
            alert('Vui lòng nhập số điện thoại hợp lệ (10-11 số)!');
            return;
        }
        if (!address.trim()) {
            alert('Vui lòng nhập địa chỉ nhận hàng!');
            return;
        }

        const orderDetails = {
            products: orderList,
            customerName,
            phoneNumber,
            address,
            total: calculateSubtotal() + shippingFee,
            date: new Date().toLocaleString(),
        };

        console.log('Đơn hàng:', orderDetails);

        alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
        setOrderList([]); // Reset giỏ hàng
        navigate('/', { replace: true });
    };

    // Nếu không có sản phẩm trong giỏ hàng
    if (orderList.length === 0) {
        return (
            <div className="container text-center my-5">
                <h3>Không có sản phẩm nào trong giỏ hàng!</h3>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Quay về trang chủ
                </Button>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center" style={{ fontSize: '3rem', color: 'black', fontWeight: 'bold' }}>
                Thanh toán đơn hàng
            </h2>

            <Row>
                {/* Danh sách sản phẩm */}
                <Col md={8}>
                    <Table responsive bordered hover className="align-middle bg-white shadow-sm rounded">
                        <thead className="table-primary">
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="me-3 rounded"
                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <h6 className="mb-0">{item.name}</h6>
                                                <small>Size: {item.size}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                {/* Thông tin giao hàng */}
                <Col md={4}>
                    <Card className="shadow-sm rounded bg-white">
                        <Card.Header className="bg-warning text-dark rounded-top">Thông tin giao hàng</Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Họ và tên người nhận</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên người nhận"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Địa chỉ giao hàng</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Nhập địa chỉ nhận hàng"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>

                            <hr />

                            <p><strong>Tạm tính:</strong> ${calculateSubtotal().toFixed(2)}</p>
                            <p><strong>Phí vận chuyển:</strong> ${shippingFee.toFixed(2)}</p>
                            <h5>Tổng cộng: ${(calculateSubtotal() + shippingFee).toFixed(2)}</h5>

                            <Button variant="success" className="w-100 mt-3" onClick={handlePlaceOrder}>
                                Đặt hàng
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Checkout;
