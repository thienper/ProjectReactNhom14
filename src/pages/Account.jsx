import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

const AccountPage = () => {
    return (
        <div className="container my-5">
            <h2 className="mb-4">Tài khoản của bạn</h2>

            <Row>
                {/* Thông tin người dùng */}
                <Col md={6}>
                    <Card className="mb-4 shadow-sm rounded">
                        <Card.Header className="bg-primary text-white rounded-top">Thông tin cá nhân</Card.Header>
                        <Card.Body>
                            <p><strong>Họ tên:</strong> Nguyễn Văn A</p>
                            <p><strong>Email:</strong> nguyenvana@example.com</p>
                            <p><strong>Số điện thoại:</strong> 0123 456 789</p>
                            <Button variant="outline-primary">Chỉnh sửa thông tin</Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Đổi mật khẩu */}
                <Col md={6}>
                    <Card className="mb-4 shadow-sm rounded">
                        <Card.Header className="bg-success text-white rounded-top">Đổi mật khẩu</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                                    <Form.Control type="password" placeholder="Nhập mật khẩu hiện tại" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu mới</Form.Label>
                                    <Form.Control type="password" placeholder="Nhập mật khẩu mới" />
                                </Form.Group>
                                <Button variant="success">Lưu thay đổi</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Địa chỉ giao hàng */}
            <Row>
                <Col>
                    <Card className="shadow-sm rounded">
                        <Card.Header className="bg-info text-white rounded-top">Địa chỉ giao hàng</Card.Header>
                        <Card.Body>
                            <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP. HCM</p>
                            <Button variant="outline-info">Chỉnh sửa địa chỉ</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AccountPage;
