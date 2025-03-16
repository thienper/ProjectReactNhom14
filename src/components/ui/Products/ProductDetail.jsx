import {
    Minus,
    Plus,
    RefreshCw,
    Shield,
    Truck
} from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
// import { getProductById } from '../api/products';
import products from "../../../Data/products.json";
import "./ProductDetail.css";
import RatingStars from './RatingStars';

const ProductDetail = () => {
    const { productId } = useParams(); // Lấy id từ URL
    const productIdd = parseInt(productId); // Đổi về số nếu id là số
    const product = products.find((item) => item.id === productIdd);

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const productData = getProductById(parseInt(params.id));
    //             if (productData) {
    //                 setProduct(productData);
    //             } else {
    //                 // Redirect to 404 if product not found
    //                 setLocation('/not-found');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching product:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchProduct();
    // }, [params.id, setLocation]);



    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        alert(`Added ${quantity} ${product.name} (Size: ${selectedSize}) to cart`);
    };

    return (
        <div className=" mx-auto px-4 mr-5 ml-2">

            {/* Product details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 d-flex">
                {/* Product images */}
                <div className="row">
                    <div className="col-6 product-gallery">
                        {/* Hình ảnh lớn */}
                        <div className="main-image">
                            <img src={selectedImage} alt={product.name} />
                        </div>

                        {/* Các hình nhỏ bên dưới */}
                        <div className="thumbnails">
                            {product.images.slice(0, 4).map((img, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='right-detail-product col-6'>
                        <h1 className="right-detail-product-name">{product.name}</h1>
                        <p className="right-detail-product-category">{product.category}</p>

                        {/* Ratings */}
                        <div className="rating-container">
                            <RatingStars rate={product.rating} />
                            <span className="review-count">({product.reviewCount} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="price-container">
                            <span className="current-price">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="product-description">{product.description}</p>

                        {/* Size selection */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Select Size</h3>
                            <div className="size-buttons-container">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2 pt-5">Quantity</h3>
                            <div className="quantity-selector">
                                <button className="quantity-button" onClick={handleDecreaseQuantity}>
                                    <Minus className="w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    className="quantity-input"
                                    value={quantity}
                                    readOnly
                                />
                                <button className="quantity-button" onClick={handleIncreaseQuantity}>
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Add to cart */}
                        <div className="button-container">
                            <button className="custom-button" onClick="handleAddToCart()">
                                <span className="icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                </span>
                                <span className="text">Add to Cart</span>
                            </button>
                        </div>

                        {/* Product meta */}
                        <div className="border-t border-gray-200 pt-6 ">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 d-flex justify-content-around">
                                <div className="flex items-center">
                                    <Truck className="w-6 h-6 text-primary mr-2" />
                                    <span className="text-sm p-1">Free shipping over $100</span>
                                </div>
                                <div className="flex items-center">
                                    <RefreshCw className="w-6 h-6 text-primary mr-2" />
                                    <span className="text-sm p-1">Free 30-day returns</span>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="w-6 h-6 text-primary mr-2" />
                                    <span className="text-sm p-1">2-year warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Product info */}

            </div>
        </div>
    );
};

export default ProductDetail;
