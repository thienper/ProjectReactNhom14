import React from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';

const CartPage = () => {
    return (
        <div className="container my-5">
            <h2 className="mb-4">Giỏ hàng của bạn</h2>

            <Row>
                {/* Bảng giỏ hàng */}
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
                            <tr>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img src="https://via.placeholder.com/60" alt="Product" className="me-3 rounded" />
                                        <div>
                                            <h6 className="mb-0">Giày Sneaker</h6>
                                            <small>Mã SP: 001</small>
                                        </div>
                                    </div>
                                </td>
                                <td>1,200,000₫</td>
                                <td>
                                    <Form.Control type="number" min="1" defaultValue="1" style={{ width: '80px' }} />
                                </td>
                                <td>1,200,000₫</td>
                                <td>
                                    <Button variant="danger" size="sm">Xóa</Button>
                                </td>
                            </tr>
                            {/* Lặp thêm sản phẩm tại đây */}
                        </tbody>
                    </Table>
                </Col>

                {/* Thanh toán */}
                <Col md={4}>
                    <Card className="shadow-sm rounded bg-white">
                        <Card.Header className="bg-warning text-dark rounded-top">Tóm tắt đơn hàng</Card.Header>
                        <Card.Body>
                            <p><strong>Tạm tính:</strong> 1,200,000₫</p>
                            <p><strong>Phí vận chuyển:</strong> 30,000₫</p>
                            <hr />
                            <h5>Tổng cộng: 1,230,000₫</h5>
                            <Button variant="success" className="w-100 mt-3">Tiến hành thanh toán</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CartPage;
