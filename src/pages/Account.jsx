import  { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import listAccount from "../Data/account.json";

const AccountPage = () => {
    // Lấy danh sách account từ localStorage hoặc JSON ban đầu
    const [accounts, setAccounts] = useState(() => {
        const storedAccounts = localStorage.getItem('accounts');
        return storedAccounts ? JSON.parse(storedAccounts) : listAccount;
    });

    // Lấy user đang đăng nhập
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Tự động cập nhật localStorage khi accounts thay đổi
    useEffect(() => {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }, [accounts]);

    // ------------------- Đăng nhập -------------------
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const handleLogin = (email, password) => {
        const account = accounts.find(acc => acc.email === email && acc.password === password);
        if (account) {
            setUser(account);
            localStorage.setItem('user', JSON.stringify(account));
            alert('Đăng nhập thành công!');
        } else {
            alert('Email hoặc mật khẩu không đúng!');
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // ------------------- Đăng ký -------------------
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const handleRegister = (e) => {
        e.preventDefault();

        // Kiểm tra các field rỗng
        const { name, email, password, phone, address } = registerInfo;
        if (!name || !email || !password || !phone || !address) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        // Kiểm tra email đã tồn tại chưa
        const emailExists = accounts.some(acc => acc.email === email);
        if (emailExists) {
            alert('Email đã tồn tại, vui lòng dùng email khác!');
            return;
        }

        const newAccount = {
            id: accounts.length + 1, // id mới
            ...registerInfo
        };

        // Thêm tài khoản mới và tự động đăng nhập
        const updatedAccounts = [...accounts, newAccount];
        setAccounts(updatedAccounts);

        setUser(newAccount);
        localStorage.setItem('user', JSON.stringify(newAccount));

        alert('Đăng ký và đăng nhập thành công!');
    };

    // ------------------- Địa chỉ giao hàng -------------------
    const [address, setAddress] = useState(user?.address || '');
    useEffect(() => {
        if (user?.address) {
            setAddress(user.address);
        }
    }, [user]);

    const handleUpdateAddress = () => {
        const updatedUser = { ...user, address };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Đồng bộ lại danh sách account
        const updatedAccounts = accounts.map(acc => acc.id === updatedUser.id ? updatedUser : acc);
        setAccounts(updatedAccounts);

        alert('Cập nhật địa chỉ thành công!');
    };

    // ------------------- Đổi mật khẩu -------------------
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const handleChangePassword = () => {
        if (currentPassword !== user.password) {
            alert('Mật khẩu hiện tại không đúng!');
            return;
        }

        const updatedUser = { ...user, password: newPassword };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Cập nhật vào danh sách accounts
        const updatedAccounts = accounts.map(acc => acc.id === updatedUser.id ? updatedUser : acc);
        setAccounts(updatedAccounts);

        alert('Đổi mật khẩu thành công!');
    };

    // ------------------- UI -------------------

    // Nếu chưa đăng nhập → hiện đăng nhập và đăng ký
    if (!user) {
        return (
            <div className="container my-5">
                <Row>
                    {/* Đăng nhập */}
                    <Col md={6}>
                        <h2 className="mb-4">Đăng nhập tài khoản</h2>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin(loginInfo.email, loginInfo.password);
                            }}
                        >
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Nhập email"
                                    value={loginInfo.email}
                                    onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    value={loginInfo.password}
                                    onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Đăng nhập
                            </Button>
                        </Form>
                    </Col>

                    {/* Đăng ký */}
                    <Col md={6}>
                        <h2 className="mb-4">Đăng ký tài khoản mới</h2>
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

                            <Button variant="success" type="submit">
                                Đăng ký
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }

    // Nếu đã đăng nhập → trang tài khoản
    return (
        <div className="container my-5">
            <h2 className="mb-4">Tài khoản của bạn</h2>

            <Row>
                <Col md={6}>
                    <Card className="mb-4 shadow-sm rounded">
                        <Card.Header className="bg-primary text-white rounded-top">
                            Thông tin cá nhân
                        </Card.Header>
                        <Card.Body>
                            <p><strong>Họ tên:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Số điện thoại:</strong> {user.phone}</p>
                            <Button variant="outline-primary" onClick={handleLogout}>
                                Đăng xuất
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="mb-4 shadow-sm rounded">
                        <Card.Header className="bg-success text-white rounded-top">
                            Đổi mật khẩu
                        </Card.Header>
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
                                <Button variant="success" onClick={handleChangePassword}>
                                    Lưu thay đổi
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="shadow-sm rounded">
                        <Card.Header className="bg-info text-white rounded-top">
                            Địa chỉ giao hàng
                        </Card.Header>
                        <Card.Body>
                            <Form.Group controlId="formAddress">
                                <Form.Label><strong>Địa chỉ:</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
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
