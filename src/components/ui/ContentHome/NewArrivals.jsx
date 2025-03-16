import React from "react";
import { Link } from "react-router-dom";
import "./NewArrivals.css";

const NewArrivals = () => {
    const products = [
        {
            "id": 19,
            "name": "Classic Nude Heels",
            "brand": "Charles & Keith",
            "price": 75,
            "originalPrice": 100,
            "discount": 25,
            "images": [
                "https://www.shutterstock.com/image-photo/beige-pointy-toe-womens-shoes-260nw-2174032935.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuHw0k4RghDF0y0HmUThjOqWldZm5GoKZWAgPndWb0vbByEBNShBnJuPuUIcenwD088EQ&usqp=CAU",
                "data:image/jpeg;base64,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"
            ],
            "colors": [
                "Nude",
                "Đen"
            ],
            "sizes": [
                35,
                36,
                37,
                38,
                39
            ],
            "category": "Giày cao gót",
            "gender": "Nữ",
            "type": "Cao gót",
            "rating": 4.6,
            "reviewCount": 280,
            "description": "Giày cao gót Classic Nude với thiết kế thanh lịch, tôn dáng giúp bạn thêm tự tin và nổi bật.",
            "features": [
                "Gót nhọn cao 7cm",
                "Chất liệu da tổng hợp cao cấp",
                "Thiết kế mũi nhọn thời trang"
            ],
            "isFeatured": false,
            "isNewArrival": true,
            "stock": 12
        },
        {
            "id": 20,
            "name": "Leather Sandals",
            "brand": "ECCO",
            "price": 90,
            "originalPrice": 120,
            "discount": 25,
            "images": [
                "https://product.hstatic.net/1000003969/product/den_sd05103_18_20240422134649_603628a878a84675a1ee61e5349e1032_master.jpeg",
                "https://product.hstatic.net/1000003969/product/den_sd05103_17_20240422134649_96ea52fcea014c0c9a5efe044e64f254_master.jpeg",
                "https://product.hstatic.net/1000003969/product/den_sd05103_18_20240422134649_603628a878a84675a1ee61e5349e1032_master.jpeg"
            ],
            "colors": [
                "Nâu",
                "Đen"
            ],
            "sizes": [
                40,
                41,
                42,
                43
            ],
            "category": "Sandal",
            "gender": "Nam",
            "type": "Sandal",
            "rating": 4.5,
            "reviewCount": 150,
            "description": "Sandal da ECCO thiết kế thoải mái, phù hợp cho mùa hè hoặc du lịch biển.",
            "features": [
                "Da thật mềm mại",
                "Đệm lót êm ái",
                "Đế cao su chống trượt"
            ],
            "isFeatured": true,
            "isNewArrival": true,
            "stock": 18
        },
        {
            "id": 21,
            "name": "Nike Air Max 270",
            "brand": "Nike",
            "price": 150,
            "originalPrice": 180,
            "discount": 17,
            "images": [
                "https://ash.vn/cdn/shop/files/3cf5361fd2872a0fa2deec7d7eba8375_1800x.jpg?v=1734423911",
                "https://supersports.com.vn/cdn/shop/files/AH8050-027-1_1200x1200.png?v=1726739143",
                "https://ash.vn/cdn/shop/files/3cf5361fd2872a0fa2deec7d7eba8375_1800x.jpg?v=1734423911"
            ],
            "colors": [
                "Đen",
                "Trắng",
                "Xanh dương"
            ],
            "sizes": [
                38,
                39,
                40,
                41,
                42,
                43,
                44
            ],
            "category": "Giày thể thao",
            "gender": "Nam",
            "type": "Thể thao",
            "rating": 4.7,
            "reviewCount": 420,
            "description": "Nike Air Max 270 là sự kết hợp giữa phong cách thời trang và hiệu năng thể thao với đế Air Max lớn nhất từ trước đến nay.",
            "features": [
                "Đệm Air lớn nhất của Nike",
                "Chất liệu vải mesh thoáng khí",
                "Thiết kế năng động, thời trang"
            ],
            "isFeatured": true,
            "isNewArrival": true,
            "stock": 30
        },
        {
            "id": 22,
            "name": "Adidas Superstar",
            "brand": "Adidas",
            "price": 90,
            "originalPrice": 110,
            "discount": 18,
            "images": [
                "https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg",
                "https://images.pexels.com/photos/1456733/pexels-photo-1456733.jpeg",
                "https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg"
            ],
            "colors": [
                "Trắng/Đen",
                "Đen/Trắng"
            ],
            "sizes": [
                37,
                38,
                39,
                40,
                41,
                42
            ],
            "category": "Giày casual",
            "gender": "Unisex",
            "type": "Casual",
            "rating": 4.5,
            "reviewCount": 500,
            "description": "Adidas Superstar với thiết kế vỏ sò đặc trưng, là biểu tượng của phong cách hip-hop và đường phố.",
            "features": [
                "Mũi giày vỏ sò bảo vệ",
                "Da thật cao cấp",
                "Đế cao su chống trượt"
            ],
            "isFeatured": true,
            "isNewArrival": true,
            "stock": 40
        },
    ];

    return (
        <section className="container my-5 pt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Giày Mới</h1>
                <a href="#!" className="text-primary fw-medium">
                    View All <i className="bi bi-arrow-right"></i>
                </a>
            </div>

            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.id} className="col-md-3">
                        <Link
                            to={`/product/${product.id}`}
                            className="text-decoration-none text-dark"
                        >
                            <div className="card h-100 shadow-sm product-card position-relative">
                                {product.isNewArrival && (
                                    <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                                        NEW
                                    </span>
                                )}
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="card-img-top"
                                />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="text-muted">{product.category}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <h5 className="text-primary fw-bold">{product.price}</h5>
                                        <button
                                            className="btn btn-dark btn-sm d-flex align-items-center"
                                            onClick={(e) => {
                                                e.preventDefault(); // Ngăn việc click button chuyển trang
                                                // TODO: Xử lý logic Add to Cart ở đây
                                            }}
                                        >
                                            <i className="bi bi-cart-plus me-2"></i> Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
