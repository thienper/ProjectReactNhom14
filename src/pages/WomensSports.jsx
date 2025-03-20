import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaStar,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaChevronRight,
  FaRegThumbsUp,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import "./styles/WomensSports.css";

const heroImageUrl =
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const WomensSports = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [brandFilters, setBrandFilters] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productResponse, reviewResponse] = await Promise.all([
          axios.get("https://67dbd6fd1fd9e43fe476247e.mockapi.io/womenshoe"),
          axios.get("https://67dbd6fd1fd9e43fe476247e.mockapi.io/reviews"),
        ]);

        let productData = productResponse.data;
        const reviewData = reviewResponse.data;

        if (!Array.isArray(productData)) {
          console.log("productData is not an array:", productData);
          if (productData.products) productData = productData.products;
          else if (productData.items) productData = productData.items;
          if (!Array.isArray(productData)) {
            console.error("Could not find valid array in response");
            productData = [];
          }
        }

        const enhancedData = productData.slice(0, 30).map((product) => ({
          ...product,
          rating: (Math.random() * 2 + 3).toFixed(1),
          category: ["running", "training", "lifestyle"][
            Math.floor(Math.random() * 3)
          ],
          isNew: Math.random() > 0.7,
          discount:
            Math.random() > 0.8 ? Math.floor(Math.random() * 20 + 10) : 0,
          bestSeller: Math.random() > 0.8,
          color: ["Đen", "Trắng", "Xanh", "Hồng", "Xám"][
            Math.floor(Math.random() * 5)
          ],
        }));

        setProducts(enhancedData);
        setFilteredProducts(enhancedData);

        let reviewsToUse = Array.isArray(reviewData)
          ? reviewData
          : reviewData.reviews || reviewData.items || [];

        setReviews(reviewsToUse.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);

        const fallbackProducts = [
          {
            id: 1,
            name: "Nike Air Zoom",
            price: "2.190.000đ",
            image:
              "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
            rating: "4.5",
            category: "running",
            isNew: true,
            discount: 0,
            bestSeller: true,
            color: "Đen",
          },
        ];

        const fallbackReviews = [
          {
            name: "Nguyễn Thị Hương",
            location: "Hà Nội",
            image:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            rating: 5,
            text: "Tôi đã mua đôi giày chạy bộ từ SoleStyle cách đây 3 tháng và vẫn rất hài lòng. Chất lượng tuyệt vời, kiểu dáng đẹp và đặc biệt là rất thoải mái khi sử dụng.",
          },
        ];

        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
        setReviews(fallbackReviews);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hàm xử lý lọc thương hiệu
  const toggleBrandFilter = (brandName) => {
    if (brandFilters.includes(brandName)) {
      setBrandFilters(brandFilters.filter((brand) => brand !== brandName));
    } else {
      setBrandFilters([...brandFilters, brandName]);
    }
  };

  // Hàm resetFilter
  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange("all");
    setActiveCategory("all");
    setActiveTab("all");
    setRatingFilter(0);
    setBrandFilters([]);
  };

  useEffect(() => {
    let result = [...products];

    // Áp dụng lọc theo khoảng giá
    if (priceRange !== "all") {
      if (priceRange === "under2m") {
        result = result.filter(
          (p) => parseInt(p.price.replace(/\D/g, "")) < 2000000
        );
      } else if (priceRange === "2m-3m") {
        result = result.filter((p) => {
          const price = parseInt(p.price.replace(/\D/g, ""));
          return price >= 2000000 && price <= 3000000;
        });
      } else if (priceRange === "over3m") {
        result = result.filter(
          (p) => parseInt(p.price.replace(/\D/g, "")) > 3000000
        );
      }
    }

    // Áp dụng lọc theo danh mục
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Áp dụng lọc theo tab
    if (activeTab === "bestseller") {
      result = result.filter((p) => p.bestSeller);
    } else if (activeTab === "new") {
      result = result.filter((p) => p.isNew);
    } else if (activeTab === "sale") {
      result = result.filter((p) => p.discount > 0);
    }

    // Áp dụng lọc theo từ khóa tìm kiếm
    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Áp dụng lọc theo xếp hạng sao
    if (ratingFilter > 0) {
      result = result.filter((p) => parseFloat(p.rating) >= ratingFilter);
    }

    // Áp dụng lọc theo thương hiệu
    if (brandFilters.length > 0) {
      result = result.filter((p) => {
        // Giả sử tên thương hiệu có trong tên sản phẩm
        return brandFilters.some((brand) =>
          p.name.toLowerCase().includes(brand.toLowerCase())
        );
      });
    }

    setFilteredProducts(result);
  }, [
    priceRange,
    searchQuery,
    activeCategory,
    activeTab,
    products,
    ratingFilter,
    brandFilters,
  ]);

  const getRunningShoes = () =>
    products.filter((p) => p.category === "running").slice(0, 4);
  const getTrainingShoes = () =>
    products.filter((p) => p.category === "training").slice(0, 4);
  const getLifestyleShoes = () =>
    products.filter((p) => p.category === "lifestyle").slice(0, 4);
  const getNewestArrivals = () => products.filter((p) => p.isNew).slice(0, 4);
  const getBestSellers = () => products.filter((p) => p.bestSeller).slice(0, 4);
  const getDiscountedProducts = () =>
    products
      .filter((p) => p.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 4);

  const brands = [
    {
      name: "Nike",
      logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Adidas",
      logo: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Puma",
      logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "New Balance",
      logo: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const getNumericPrice = (priceStr) => {
    return parseInt(priceStr.replace(/\D/g, ""));
  };

  // Render stars for rating
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const calculateDiscountPrice = (price, discount) => {
    if (discount === 0) return price;
    const numericPrice = getNumericPrice(price);
    const discountAmount = numericPrice * (discount / 100);
    const finalPrice = numericPrice - discountAmount;
    return finalPrice.toLocaleString("vi-VN") + "đ";
  };

  const renderProductCard = (product) => (
    <div className="product-card bg-white rounded-xl shadow-sm h-full overflow-hidden group">
      <div
        className="product-image-container overflow-hidden relative"
        style={{ height: "260px" }}
      >
        {product.isNew && (
          <div className="badge badge-new absolute top-2 left-2 z-10 px-2 py-1 rounded-md font-medium">
            Mới
          </div>
        )}

        {product.discount > 0 && (
          <div className="badge badge-sale absolute top-2 right-2 z-10 px-2 py-1 rounded-md font-medium">
            -{product.discount}%
          </div>
        )}

        {product.bestSeller && (
          <div className="badge badge-bestseller absolute bottom-2 left-2 z-10 px-2 py-1 rounded-md font-medium">
            Bán chạy
          </div>
        )}

        <img
          src={product.image}
          className="product-image w-full h-full object-cover"
          alt={product.name}
        />

        <div className="overlay absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex justify-center space-x-3">
          <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-pink-100">
            <FaHeart className="text-pink-500" />
          </button>
          <button className="bg-blue-600 text-white rounded-full px-4 hover:bg-blue-700 flex-grow flex items-center justify-center">
            <FaShoppingCart className="mr-1" /> Thêm vào giỏ
          </button>
        </div>
      </div>

      <div className="text-center p-4">
        <div className="text-sm text-gray-500 mb-1 capitalize">
          {product.category === "running"
            ? "Chạy bộ"
            : product.category === "training"
            ? "Tập luyện"
            : "Đời thường"}
        </div>
        <h3 className="font-bold text-lg mb-1 line-clamp-1 hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="mb-1 flex justify-center">
          {renderRating(product.rating)}
        </div>

        <div className="text-sm text-gray-500 mb-2 flex justify-center items-center">
          <span
            className="inline-block w-3 h-3 rounded-full mr-1"
            style={{
              backgroundColor:
                product.color === "Đen"
                  ? "black"
                  : product.color === "Trắng"
                  ? "white"
                  : product.color === "Xanh"
                  ? "blue"
                  : product.color === "Hồng"
                  ? "pink"
                  : "gray",
              border: product.color === "Trắng" ? "1px solid #ddd" : "none",
            }}
          ></span>
          {product.color}
        </div>

        <div className="flex justify-center items-center mb-3">
          {product.discount > 0 ? (
            <>
              <p className="text-gray-400 line-through mr-2">{product.price}</p>
              <p className="text-blue-600 font-bold">
                {calculateDiscountPrice(product.price, product.discount)}
              </p>
            </>
          ) : (
            <p className="text-blue-600 font-bold">{product.price}</p>
          )}
        </div>

        <button className="btn-outline w-full py-2 px-4 rounded-lg">
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={heroImageUrl}
            alt="Women's Sports Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent flex items-center">
            <div className="text-white p-6 md:p-16 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Giày Thể Thao Nữ
              </h1>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Khám phá bộ sưu tập giày thể thao nữ cao cấp, kết hợp hoàn hảo
                giữa phong cách và hiệu suất
              </p>
              <button className="bg-white text-gray-800 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition-colors">
                Khám Phá Ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Layout chia trang thành sidebar lọc (bên trái) và nội dung chính (bên phải) */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar lọc sản phẩm - ẩn trên mobile, hiển thị trên desktop */}
          <div className="md:w-1/4 hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h3 className="font-bold text-lg border-b pb-2 mb-4">
                Danh Mục Sản Phẩm
              </h3>

              {/* Các tab chính được sắp xếp dọc */}
              <div className="flex flex-col space-y-2 mb-6">
                <button
                  className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${
                    activeTab === "all" ? "active" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  <span className="mr-2 text-xl">🏆</span> Tất cả sản phẩm
                </button>
                <button
                  className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${
                    activeTab === "bestseller" ? "active" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("bestseller")}
                >
                  <span className="mr-2 text-xl">🔥</span> Bán chạy nhất
                </button>
                <button
                  className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${
                    activeTab === "new" ? "active" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("new")}
                >
                  <span className="mr-2 text-xl">✨</span> Sản phẩm mới
                </button>
                <button
                  className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${
                    activeTab === "sale" ? "active" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("sale")}
                >
                  <span className="mr-2 text-xl">🏷️</span> Giảm giá
                </button>
              </div>

              {/* Lọc theo loại giày */}
              <h3 className="font-bold border-b pb-2 mb-3">Loại Giày</h3>
              <div className="flex flex-col space-y-2 mb-6">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    className="form-radio text-blue-600 h-4 w-4"
                    checked={activeCategory === "all"}
                    onChange={() => setActiveCategory("all")}
                  />
                  <span className="ml-2 text-gray-700">Tất cả</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    className="form-radio text-blue-600 h-4 w-4"
                    checked={activeCategory === "running"}
                    onChange={() => setActiveCategory("running")}
                  />
                  <span className="ml-2 text-gray-700">Chạy bộ</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    className="form-radio text-blue-600 h-4 w-4"
                    checked={activeCategory === "training"}
                    onChange={() => setActiveCategory("training")}
                  />
                  <span className="ml-2 text-gray-700">Tập luyện</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    className="form-radio text-blue-600 h-4 w-4"
                    checked={activeCategory === "lifestyle"}
                    onChange={() => setActiveCategory("lifestyle")}
                  />
                  <span className="ml-2 text-gray-700">Đời thường</span>
                </label>
              </div>

              <h3 className="font-bold border-b pb-2 mb-3">Giá</h3>
              <div className="flex flex-col space-y-2 mb-6">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    className="form-radio text-blue-600 h-4 w-4"
                    checked={priceRange === "all"}
                    onChange={() => setPriceRange("all")}
                  />
                  <span className="ml-2 text-gray-700">Tất cả giá</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    className="form-radio text-blue-600 h-4 w-4"
                    checked={priceRange === "under2m"}
                    onChange={() => setPriceRange("under2m")}
                  />
                  <span className="ml-2 text-gray-700">Dưới 2 triệu đồng</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    className="form-radio text-blue-600 h-4 w-4"
                    checked={priceRange === "2m-3m"}
                    onChange={() => setPriceRange("2m-3m")}
                  />
                  <span className="ml-2 text-gray-700">2 - 3 triệu đồng</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    className="form-radio text-blue-600 h-4 w-4"
                    checked={priceRange === "over3m"}
                    onChange={() => setPriceRange("over3m")}
                  />
                  <span className="ml-2 text-gray-700">Trên 3 triệu đồng</span>
                </label>
              </div>

              <h3 className="font-bold border-b pb-2 mb-3">Đánh Giá</h3>
              <div className="flex flex-col space-y-2 mb-6">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    className={`flex items-center text-left hover:bg-gray-100 rounded-md p-1 ${
                      ratingFilter === star ? "bg-blue-50" : ""
                    }`}
                    onClick={() =>
                      setRatingFilter(ratingFilter === star ? 0 : star)
                    }
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < star ? "text-yellow-400" : "text-gray-300"
                          }
                          size={16}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-700">trở lên</span>
                  </button>
                ))}
              </div>

              <h3 className="font-bold border-b pb-2 mb-3">Thương Hiệu</h3>
              <div className="flex flex-col space-y-2 mb-6">
                {brands.map((brand, index) => (
                  <label
                    key={index}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600 h-4 w-4"
                      checked={brandFilters.includes(brand.name)}
                      onChange={() => toggleBrandFilter(brand.name)}
                    />
                    <span className="ml-2 text-gray-700">{brand.name}</span>
                  </label>
                ))}
              </div>

              <button
                className="btn-primary w-full py-2 px-4 rounded-lg"
                onClick={resetFilters}
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>

          <div className="fixed bottom-4 right-4 z-30 md:hidden">
            <button
              className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
              onClick={() => setShowMobileFilters(true)}
            >
              <FaFilter />
            </button>
          </div>

          {showMobileFilters && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-70 md:hidden">
              <div className="absolute right-0 top-0 bottom-0 w-[80%] bg-white overflow-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Bộ lọc</h3>
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <h3 className="font-bold border-b pb-2 mb-3">Danh Mục</h3>
                  <div className="flex flex-col space-y-2 mb-6">
                    <button
                      className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${
                        activeTab === "all" ? "active" : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setActiveTab("all");
                        setShowMobileFilters(false);
                      }}
                    >
                      <span className="mr-2 text-xl">🏆</span> Tất cả sản phẩm
                    </button>
                    <button
                      className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${
                        activeTab === "bestseller"
                          ? "active"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setActiveTab("bestseller");
                        setShowMobileFilters(false);
                      }}
                    >
                      <span className="mr-2 text-xl">🔥</span> Bán chạy nhất
                    </button>
                    <button
                      className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${
                        activeTab === "new" ? "active" : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setActiveTab("new");
                        setShowMobileFilters(false);
                      }}
                    >
                      <span className="mr-2 text-xl">✨</span> Sản phẩm mới
                    </button>
                    <button
                      className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${
                        activeTab === "sale" ? "active" : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setActiveTab("sale");
                        setShowMobileFilters(false);
                      }}
                    >
                      <span className="mr-2 text-xl">🏷️</span> Giảm giá
                    </button>
                  </div>

                  <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
                    <div className="flex gap-2">
                      <button
                        className="btn-outline flex-1 py-3"
                        onClick={() => {
                          setShowMobileFilters(false);
                        }}
                      >
                        Hủy
                      </button>
                      <button
                        className="btn-primary flex-1 py-3"
                        onClick={() => {
                          setShowMobileFilters(false);
                        }}
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên sản phẩm..."
                  className="pl-10 py-3 pr-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                {activeTab === "all"
                  ? "Tất Cả Sản Phẩm"
                  : activeTab === "bestseller"
                  ? "Sản Phẩm Bán Chạy"
                  : activeTab === "new"
                  ? "Sản Phẩm Mới"
                  : "Sản Phẩm Giảm Giá"}
              </h2>
              <p className="text-gray-600">
                Đang hiển thị {filteredProducts.length} sản phẩm
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="loading-indicator mx-auto">
                  <div></div>
                  <div></div>
                </div>
                <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
              </div>
            ) : (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-600 mb-4">
                      Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn.
                    </p>
                    <button className="btn-outline" onClick={resetFilters}>
                      Xóa bộ lọc
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="fade-in">
                        {renderProductCard(product)}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Phân trang */}
            {filteredProducts.length > 0 && !loading && (
              <div className="flex justify-center mt-8">
                <nav className="inline-flex">
                  <button className="py-2 px-4 border border-gray-300 rounded-l-lg bg-white hover:bg-gray-50">
                    Trước
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`py-2 px-4 border-t border-b border-gray-300 ${
                        page === 1
                          ? "bg-blue-600 text-white"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="py-2 px-4 border border-gray-300 rounded-r-lg bg-white hover:bg-gray-50">
                    Tiếp
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Bộ Sưu Tập Nổi Bật
          </h2>

          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Giày Chạy Bộ</h3>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center"
              >
                Xem tất cả <FaChevronRight className="ml-1 text-xs" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getRunningShoes().map((shoe) => (
                <div key={shoe.id}>{renderProductCard(shoe)}</div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Giày Tập Luyện</h3>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center"
              >
                Xem tất cả <FaChevronRight className="ml-1 text-xs" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getTrainingShoes().map((shoe) => (
                <div key={shoe.id}>{renderProductCard(shoe)}</div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Giày Đời Thường</h3>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center"
              >
                Xem tất cả <FaChevronRight className="ml-1 text-xs" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getLifestyleShoes().map((shoe) => (
                <div key={shoe.id}>{renderProductCard(shoe)}</div>
              ))}
            </div>
          </div>

          {/* Newest Arrivals Collection */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Sản Phẩm Mới</h3>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center"
              >
                Xem tất cả <FaChevronRight className="ml-1 text-xs" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getNewestArrivals().map((shoe) => (
                <div key={shoe.id}>{renderProductCard(shoe)}</div>
              ))}
            </div>
          </div>

          {/* Best Sellers Collection */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Sản Phẩm Bán Chạy</h3>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center"
              >
                Xem tất cả <FaChevronRight className="ml-1 text-xs" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getBestSellers().map((shoe) => (
                <div key={shoe.id}>{renderProductCard(shoe)}</div>
              ))}
            </div>
          </div>

          {/* Sale Items Collection */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Sản Phẩm Giảm Giá</h3>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center"
              >
                Xem tất cả <FaChevronRight className="ml-1 text-xs" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getDiscountedProducts().map((shoe) => (
                <div key={shoe.id}>{renderProductCard(shoe)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Đánh Giá Từ Khách Hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
                <div className="mb-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-700 line-clamp-4">{review.text}</p>
                <div className="mt-4 flex items-center text-gray-500 text-sm">
                  <FaRegThumbsUp className="mr-1" />
                  <span>Hữu ích?</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Thương Hiệu Nổi Tiếng
          </h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="text-center hover-lift p-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-16 w-16 object-contain mx-auto mb-2"
                />
                <p className="font-medium">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomensSports;
