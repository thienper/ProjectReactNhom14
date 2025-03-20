import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useOrder } from '../context/ContextAPI';

const AccountPage = () => {
    const { user, updateUser, register, login, logout } = useOrder();
    const [address, setAddress] = useState(user?.address || ''); // Khởi tạo state address
    useEffect(() => {
        if (user?.address) {
            setAddress(user.address);
        }
    }, [user]);
    // State cho đăng ký
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });

    const handleRegister = (e) => {
        e.preventDefault();

        if (!registerInfo.name || !registerInfo.email || !registerInfo.password) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        register(registerInfo);
        alert('Đăng ký thành công!');
    };

    // State cho đổi mật khẩu
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleUpdateAddress = () => {
        updateUser({ address });
    };
    const handleChangePassword = () => {
        if (currentPassword !== user.password) {
            alert('Mật khẩu hiện tại không đúng!');
            return;
        }

        const updatedUser = { ...user, password: newPassword };
        login(updatedUser);
        alert('Đổi mật khẩu thành công!');
    };

    if (!user) {
        // Nếu chưa có user -> hiện form đăng ký
        return (
            <div className="container my-5">
                <h2 className="mb-4">Đăng ký tài khoản</h2>
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập họ tên"
                            value={registerInfo.name}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email"
                            value={registerInfo.email}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={registerInfo.password}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số điện thoại"
                            value={registerInfo.phone}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, phone: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập địa chỉ"
                            value={registerInfo.address}
                            onChange={(e) => setRegisterInfo({ ...registerInfo, address: e.target.value })}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Đăng ký
                    </Button>
                </Form>
            </div>
        );
    }

    // Nếu đã có user -> hiện thông tin tài khoản
    return (
        <div className="container my-5">
            <h2 className="mb-4">Tài khoản của bạn</h2>

            <Row>
                <Col md={6}>
                    <Card className="mb-4 shadow-sm rounded">
                        <Card.Header className="bg-primary text-white rounded-top">Thông tin cá nhân</Card.Header>
                        <Card.Body>
                            <p><strong>Họ tên:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Số điện thoại:</strong> {user.phone}</p>
                            <Button variant="outline-primary" onClick={logout}>Đăng xuất</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="mb-4 shadow-sm rounded">
                        <Card.Header className="bg-success text-white rounded-top">Đổi mật khẩu</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu hiện tại"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu mới</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu mới"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="success" onClick={handleChangePassword}>Lưu thay đổi</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="shadow-sm rounded">
                        <Card.Header className="bg-info text-white rounded-top">Địa chỉ giao hàng</Card.Header>
                        <Card.Body>
                            <Form.Group controlId="formAddress">
                                <Form.Label><strong>Địa chỉ:</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={address}
                                    onChange={handleAddressChange}
                                    placeholder="Nhập địa chỉ giao hàng"
                                />
                            </Form.Group>
                            <Button variant="info" className="mt-3" onClick={handleUpdateAddress}>
                                Cập nhật
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AccountPage;
