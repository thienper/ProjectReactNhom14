import 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useOrder } from '../context/ContextAPI';

const CartPage = () => {
    const { orderList, removeFromOrder, updateQuantity } = useOrder();

    const handleQuantityChange = (id, quantity) => {
        const updatedQuantity = parseInt(quantity);
        if (updatedQuantity < 1 || isNaN(updatedQuantity)) return;

        updateQuantity(id, updatedQuantity);
    };

    const handleRemoveItem = (id, size) => {
        removeFromOrder(id, size);
    };

    const calculateSubtotal = () => {
        return orderList.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div
            style={{
                backgroundImage: `url('https://m.yodycdn.com/blog/hinh-nen-giay-jordan-yody-vn-62.jpg')`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '50px 0',
                color: "white"
            }}
        >
            <div className="container my-5">
                <h2 className="mb-4 text-center" style={{ fontSize: '3rem', color: 'white', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', marginTop: '-40px' }}>Giỏ hàng của bạn</h2>

                <Row>
                    <Col md={8}>
                        <Table responsive bordered hover className="align-middle bg-white shadow-sm rounded" >
                            <thead className="table-primary" >
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="d-flex align-items-center" >
                                                <img src={item.image} alt={item.name} className="me-3 rounded" style={{ width: '60px', height: '60px' }} />
                                                <div>
                                                    <h6 className="mb-0">{item.name}</h6>
                                                    <small>Size: {item.size} </small>
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
                                            <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id, item.size)}>
                                                🗑️
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm rounded bg-white">
                            <Card.Header className="bg-warning text-dark rounded-top">Tóm tắt đơn hàng</Card.Header>
                            <Card.Body>
                                <p><strong>Tạm tính:</strong> ${calculateSubtotal().toFixed(2)}</p>
                                <p><strong>Phí vận chuyển:</strong> $5.00</p>
                                <hr />
                                <h5>Tổng cộng: ${(calculateSubtotal() + 5).toFixed(2)}</h5>
                                <Button as={Link} to={"/checkout"} variant="success" className="w-100 mt-3">Tiến hành thanh toán</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>

    );
};

export default CartPage;
