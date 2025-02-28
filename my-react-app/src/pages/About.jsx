import giay1 from "../assets/images/giay1.jpg"
import giay2 from "../assets/images/giay2.jpg"
import giay3 from "../assets/images/giay3.jpg"
import giay4 from "../assets/images/giay4.jpg"
import giay5 from "../assets/images/giay5.jpg"
import giay6 from "../assets/images/giay6.jpg"
import giay7 from "../assets/images/giay7.jpg"
import giay8 from "../assets/images/giay8.jpg"

function About() {
    const products = [
        {
            id: 1,
            name: "Sản phẩm A",
            price: "500.000đ",
            discount: "10%",
            image: giay1,
        },
        {
            id: 2,
            name: "Sản phẩm B",
            price: "750.000đ",
            discount: "15%",
            image: giay2,
        },
        {
            id: 3,
            name: "Sản phẩm C",
            price: "1.000.000đ",
            discount: "5%",
            image: giay3,
        },
        {
            id: 4,
            name: "Sản phẩm D",
            price: "900.000đ",
            discount: "20%",
            image: giay4,
        },
        {
            id: 5,
            name: "Sản phẩm E",
            price: "650.000đ",
            discount: "12%",
            image: giay5,
        },
        {
            id: 6,
            name: "Sản phẩm F",
            price: "800.000đ",
            discount: "8%",
            image: giay6,
        },
        {
            id: 6,
            name: "Sản phẩm G",
            price: "800.000đ",
            discount: "8%",
            image: giay7,
        },
        {
            id: 6,
            name: "Sản phẩm H",
            price: "800.000đ",
            discount: "8%",
            image: giay8,
        },
    ];
    return (
        <div className="container mt-4">
            <div>
                <h2>TRANG THÔNG TIN</h2>
            </div> <br />
            <div className="row">
                {products.map((product) => (
                    <div className="col-12 col-md-4 mb-4" key={product.id}>
                        <div className="card shadow-sm">
                            <img src={product.image} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text text-danger">Giá: {product.price}</p>
                                <p className="card-text text-success">Khuyến mãi: {product.discount}</p>
                                <a href="#" className="btn btn-primary">
                                    Xem thêm
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default About;