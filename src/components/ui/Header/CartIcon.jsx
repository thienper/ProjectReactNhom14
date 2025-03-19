/* eslint-disable no-unused-vars */
import { ShoppingBag, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const CartIcon = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Nike Air Max",
            size: "10",
            color: "Black",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        },
        {
            id: 2,
            name: "Adidas Ultra Boost",
            size: "9",
            color: "White",
            price: 159.99,
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86"
        },
        {
            id: 3,
            name: "New Balance 574",
            size: "8.5",
            color: "Gray",
            price: 84.99,
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
        }
    ]);

    const navigate = useNavigate();

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
    };

    const handleNavigate = (path) => {
        setCartOpen(false);
        navigate(path);
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div className="position-relative">
            <button
                className="btn btn-light position-relative"
                onClick={() => setCartOpen(!cartOpen)}
            >
                <ShoppingBag className="w-5 h-5" />
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cartItems.length}
                </span>
            </button>

            {cartOpen && (
                <div
                    className="position-fixed end-0 top-0 mt-5 me-4 p-3 bg-white rounded shadow border"
                    style={{
                        width: '320px',
                        zIndex: 1000
                    }}
                >
                    <div className="border-bottom pb-2 mb-2">
                        <h6 className="mb-0">Your Cart ({cartItems.length} items)</h6>
                    </div>

                    <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                        {cartItems.map(item => (
                            <div key={item.id} className="d-flex align-items-center mb-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="rounded me-2"
                                    style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                                />
                                <div className="flex-grow-1">
                                    <p className="mb-1 fw-medium">{item.name}</p>
                                    <small className="text-muted">
                                        Size: {item.size} | {item.color}
                                    </small>
                                    <p className="mb-0 fw-semibold text-primary">${item.price.toFixed(2)}</p>
                                </div>
                                <button
                                    className="btn btn-sm text-danger ms-2"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border-top pt-2 mt-2">
                        <div className="d-flex justify-content-between fw-bold">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="mt-3 d-grid gap-2">
                            <button onClick={() => handleNavigate('/checkout')} className="btn btn-primary btn-sm">
                                Checkout
                            </button>
                            <button onClick={() => handleNavigate('/cart')} className="btn btn-outline-primary btn-sm">
                                View Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartIcon;

// import { ShoppingBag } from 'lucide-react';
// import React, { useState } from 'react';
// import { Link } from "react-router-dom";

// const CartIcon = () => {
//     const [cartOpen, setCartOpen] = useState(false);

//     const cartItems = [
//         {
//             id: 1,
//             name: "Nike Air Max",
//             size: "10",
//             color: "Black",
//             price: 129.99,
//             image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
//         },
//         {
//             id: 2,
//             name: "Adidas Ultra Boost",
//             size: "9",
//             color: "White",
//             price: 159.99,
//             image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86"
//         },
//         {
//             id: 3,
//             name: "New Balance 574",
//             size: "8.5",
//             color: "Gray",
//             price: 84.99,
//             image: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
//         }
//     ];

//     const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

//     return (
//         <div className="position-relative">
//             {/* Nút icon giỏ hàng */}
//             <button
//                 className="btn btn-light position-relative"
//                 onClick={() => setCartOpen(!cartOpen)}
//             >
//                 <ShoppingBag className="w-5 h-5" />
//                 <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
//                     {cartItems.length}
//                 </span>
//             </button>

//             {/* Dropdown Cart */}
//             <div
//                 className={`position-absolute end-0 mt-2 p-3 bg-white rounded shadow border z-50`}
//                 style={{
//                     width: '320px',
//                     display: cartOpen ? 'block' : 'none'
//                 }}
//             >
//                 <div className="border-bottom pb-2 mb-2">
//                     <h6 className="mb-0">Your Cart ({cartItems.length} items)</h6>
//                 </div>

//                 {/* Cart Items */}
//                 <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
//                     {cartItems.map(item => (
//                         <div key={item.id} className="d-flex align-items-center mb-3">
//                             <img
//                                 src={item.image}
//                                 alt={item.name}
//                                 className="rounded me-2"
//                                 style={{ width: '48px', height: '48px', objectFit: 'cover' }}
//                             />
//                             <div className="flex-grow-1">
//                                 <p className="mb-1 fw-medium">{item.name}</p>
//                                 <small className="text-muted">
//                                     Size: {item.size} | {item.color}
//                                 </small>
//                                 <p className="mb-0 fw-semibold text-primary">${item.price.toFixed(2)}</p>
//                             </div>
//                             <button className="btn btn-sm btn-outline-danger ms-2">
//                                 <i className="bi bi-trash"></i>
//                             </button>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Cart Summary */}
//                 <div className="border-top pt-2 mt-2">
//                     <div className="d-flex justify-content-between fw-bold">
//                         <span>Subtotal:</span>
//                         <span>${subtotal.toFixed(2)}</span>
//                     </div>

//                     <div className="mt-3 d-grid gap-2">
//                         <Link to="/checkout" className="btn btn-primary btn-sm">
//                             Checkout
//                         </Link>
//                         <Link to="/cart" className="btn btn-outline-primary btn-sm">
//                             View Cart
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartIcon;
