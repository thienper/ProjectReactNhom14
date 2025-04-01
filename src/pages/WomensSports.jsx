import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  FaChevronDown,
  FaChevronRight,
  FaChevronUp,
  FaFilter,
  FaHeart,
  FaRegThumbsUp,
  FaSearch,
  FaShoppingCart,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import "./styles/WomensHeels.css";

const heroImageUrl =
  "https://houserentaldanang.com/wp-content/uploads/2023/09/giay-the-thao-Da-Nang-9.jpg";

const WomensSports = () => {
  const [products, setProducts] = useState([]);
  const [reviews] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [brandFilters, setBrandFilters] = useState([]);

  const { path } = useParams()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [path]);
  // State for collapsible sections
  const [showCategories, setShowCategories] = useState(true);
  const [showShoeTypes, setShowShoeTypes] = useState(true);
  const [showPriceRanges, setShowPriceRanges] = useState(true);
  const [showRatings, setShowRatings] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://apishoes-ihcb.onrender.com/products");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (!isMounted) return;


        const menLeatherShoes = data.filter(
          product => product.gender === "Nữ" &&
            (product.category?.toLowerCase().includes("thể thao") ||
              product.type?.toLowerCase().includes("thể thao"))
        );

        // Format dữ liệu
        const formattedProducts = menLeatherShoes.map(product => ({
          ...product,
          id: product.id || Math.random().toString(36).substr(2, 9),
          price: typeof product.price === "number"
            ? `${product.price.toLocaleString("vi-VN")}đ`
            : product.price,
          image: product.images?.[0] || product.image || "https://via.placeholder.com/400x500?text=No+Image",
          isNew: product.isNewArrival || product.isNew || false,
          bestSeller: product.isFeatured || product.bestSeller || false,
          color: product.colors?.[0] || product.color || "Đen",
          discount: product.discount || 0,
          rating: product.rating ? parseFloat(product.rating).toFixed(1) : (Math.random() * 2 + 3).toFixed(1)
        }));

        // Fallback data nếu không có sản phẩm
        const productsToUse = formattedProducts.length > 0
          ? formattedProducts
          : [
            {
              id: "fallback-1",
              name: "Giày Tây Nam Da Thật",
              price: "1.890.000đ",
              image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
              rating: "4.5",
              isNew: true,
              discount: 15,
              bestSeller: true,
              color: "Đen"
            }
          ];

        if (isMounted) {
          setProducts(productsToUse);
          setFilteredProducts(productsToUse);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        if (isMounted) {
          setLoading(false);

        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleBrandFilter = (brandName) => {
    if (brandFilters.includes(brandName)) {
      setBrandFilters(brandFilters.filter((brand) => brand !== brandName));
    } else {
      setBrandFilters([...brandFilters, brandName]);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange("all");
    setActiveCategory("all");
    setActiveTab("all");
    setRatingFilter(0);
    setBrandFilters([]);
  };

  // Prepare active filters
  const activeFilters = [];
  if (activeTab !== "all") {
    activeFilters.push({
      label:
        activeTab === "bestseller"
          ? "Bán chạy"
          : activeTab === "new"
            ? "Mới"
            : "Giảm giá",
      clear: () => setActiveTab("all"),
    });
  }
  if (activeCategory !== "all") {
    activeFilters.push({
      label:
        activeCategory === "stiletto"
          ? "Stiletto"
          : activeCategory === "block"
            ? "Gót vuông"
            : "Gót thấp",
      clear: () => setActiveCategory("all"),
    });
  }
  if (priceRange !== "all") {
    activeFilters.push({
      label:
        priceRange === "under1m"
          ? "< 1 triệu"
          : priceRange === "1m-2m"
            ? "1-2 triệu"
            : "> 2 triệu",
      clear: () => setPriceRange("all"),
    });
  }
  if (ratingFilter > 0) {
    activeFilters.push({
      label: `${ratingFilter}★ trở lên`,
      clear: () => setRatingFilter(0),
    });
  }

  brandFilters.forEach((brand) => {
    activeFilters.push({
      label: brand,
      clear: () => toggleBrandFilter(brand),
    });
  });

  useEffect(() => {
    let result = [...products];

    if (priceRange !== "all") {
      if (priceRange === "under1m") {
        result = result.filter(
          (p) => parseInt(p.price.replace(/\D/g, "")) < 1000000
        );
      } else if (priceRange === "1m-2m") {
        result = result.filter((p) => {
          const price = parseInt(p.price.replace(/\D/g, ""));
          return price >= 1000000 && price <= 2000000;
        });
      } else if (priceRange === "over2m") {
        result = result.filter(
          (p) => parseInt(p.price.replace(/\D/g, "")) > 2000000
        );
      }
    }

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (activeTab === "bestseller") {
      result = result.filter((p) => p.bestSeller);
    } else if (activeTab === "new") {
      result = result.filter((p) => p.isNew);
    } else if (activeTab === "sale") {
      result = result.filter((p) => p.discount > 0);
    }

    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (ratingFilter > 0) {
      result = result.filter((p) => parseFloat(p.rating) >= ratingFilter);
    }

    if (brandFilters.length > 0) {
      result = result.filter((p) => {
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

  // eslint-disable-next-line no-unused-vars
  const getStilettoHeels = () =>
    products.filter((p) => p.category === "stiletto").slice(0, 4);
  // eslint-disable-next-line no-unused-vars
  const getBlockHeels = () =>
    products.filter((p) => p.category === "block").slice(0, 4);
  // eslint-disable-next-line no-unused-vars
  const getKittenHeels = () =>
    products.filter((p) => p.category === "kitten").slice(0, 4);
  // eslint-disable-next-line no-unused-vars
  const getNewestArrivals = () => products.filter((p) => p.isNew).slice(0, 4);
  const getBestSellers = () => products.filter((p) => p.bestSeller).slice(0, 4);
  // eslint-disable-next-line no-unused-vars
  const getDiscountedProducts = () =>
    products
      .filter((p) => p.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 4);

  const brands = [
    {
      name: "Christian Louboutin",
      logo: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Jimmy Choo",
      logo: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Manolo Blahnik",
      logo: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Steve Madden",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mZKV3IQcBSzFkNB9FYf5F4RM4yeNHxaEyRMsy9J7kpNyqp492IM6FTvkgIrD8PdBd90&usqp=CAU",
    },
  ];

  const getNumericPrice = (priceStr) => {
    if (typeof priceStr === "number") {
      return priceStr;
    }
    return parseInt(String(priceStr).replace(/\D/g, "")) || 0;
  };

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

  // Component for filter section headers
  const FilterSectionHeader = ({ title, isOpen, toggle, count }) => (
    <div
      className="flex items-center justify-between cursor-pointer py-2"
      onClick={toggle}
    >
      <h4 className="font-medium text-gray-700">{title}</h4>
      <div className="flex items-center">
        {count !== undefined && (
          <span className="text-sm text-gray-500 mr-2">{count}</span>
        )}
        {isOpen ? (
          <FaChevronUp className="text-gray-400" />
        ) : (
          <FaChevronDown className="text-gray-400" />
        )}
      </div>
    </div>
  );

  FilterSectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    count: PropTypes.number,
  };

  const renderProductCard = (product) => (
    <div className="product-card bg-white rounded-xl shadow-sm h-full overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div
        className="product-image-container overflow-hidden relative"
        style={{ height: "260px" }}
      >
        {product.isNew && (
          <div className="badge badge-new absolute top-2 left-2 z-10 px-2 py-1 rounded-md font-medium bg-blue-600 text-white">
            Mới
          </div>
        )}

        {product.discount > 0 && (
          <div className="badge badge-sale absolute top-2 right-2 z-10 px-2 py-1 rounded-md font-medium bg-red-500 text-white">
            -{product.discount}%
          </div>
        )}

        {product.bestSeller && (
          <div className="badge badge-bestseller absolute bottom-2 left-2 z-10 px-2 py-1 rounded-md font-medium bg-amber-500 text-white">
            Bán chạy
          </div>
        )}

        <img
          src={product.image}
          className="product-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/400x500?text=Image+Error";
          }}
        />

        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-pink-500 rounded-full p-3 mx-2 hover:bg-pink-50 transition duration-300 transform hover:scale-110">
            <FaHeart />
          </button>
          <button className="bg-blue-600 text-white rounded-full p-3 mx-2 hover:bg-blue-700 transition duration-300 transform hover:scale-110">
            <FaShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1 capitalize">
          {product.category === "stiletto"
            ? "Stiletto"
            : product.category === "block"
              ? "Gót vuông"
              : "Gót thấp"}
        </div>
        <h3 className="font-bold text-lg mb-1 line-clamp-1 hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="mb-1">{renderRating(product.rating)}</div>

        <div className="text-sm text-gray-500 mb-2 flex items-center">
          <span
            className="inline-block w-3 h-3 rounded-full mr-1"
            style={{
              backgroundColor:
                product.color === "Đen"
                  ? "black"
                  : product.color === "Trắng"
                    ? "white"
                    : product.color === "Nâu"
                      ? "brown"
                      : product.color === "Đỏ"
                        ? "red"
                        : "beige",
              border:
                product.color === "Trắng" || product.color === "Be"
                  ? "1px solid #ddd"
                  : "none",
            }}
          ></span>
          {product.color}
        </div>

        {/* Bottom section with price and button */}
        <div className="flex justify-between items-center mt-3">
          <div>
            {product.discount > 0 ? (
              <>
                <p className="text-gray-400 line-through text-sm">
                  {product.price}
                </p>
                <p className="text-blue-600 font-bold">
                  {calculateDiscountPrice(product.price, product.discount)}
                </p>
              </>
            ) : (
              <p className="text-blue-600 font-bold">{product.price}</p>
            )}
          </div>

          <Button as={Link} to={`/product/${product.id}`} className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
            <FaShoppingCart />
          </Button>
        </div>
      </div>
    </div>

  );

  return (
    <div className="bg-gray-50">
      <div className="relative">
        <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={heroImageUrl}
            alt="Women's Heels Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent flex items-center">
            <div className="text-white p-6 md:p-16 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Giày Thể Thao Nữ
              </h1>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Khám phá bộ sưu tập giày thể thao cao cấp, tôn dáng và tạo nên vẻ
                sang trọng cho mọi bước chân
              </p>
              <button className="bg-white text-gray-800 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition-colors">
                Khám Phá Ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-xl mb-5 text-gray-800 flex items-center">
                <span className="bg-blue-100 p-2 rounded-md mr-2 text-blue-600">
                  <FaFilter />
                </span>
                Bộ lọc sản phẩm
              </h3>

              {/* Applied filters section */}
              {activeFilters.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-700">Bạn đã chọn</h4>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activeFilters.map((filter, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full flex items-center"
                      >
                        {filter.label}
                        <button
                          onClick={filter.clear}
                          className="ml-1 hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Thanh tìm kiếm sản phẩm */}
              <div className="mb-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {searchQuery && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchQuery("")}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {/* Danh mục sản phẩm */}
              <div className="mb-5 border-b border-gray-100 pb-4">
                <FilterSectionHeader
                  title="Danh mục"
                  isOpen={showCategories}
                  toggle={() => setShowCategories(!showCategories)}
                />

                {showCategories && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeTab === "all"
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      onClick={() => setActiveTab("all")}
                    >
                      <span className="text-2xl mb-1">🏆</span>
                      <span className="text-sm">Tất cả</span>
                      <span className="text-xs text-gray-500 mt-1">
                        {products.length}
                      </span>
                    </button>

                    <button
                      className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeTab === "bestseller"
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      onClick={() => setActiveTab("bestseller")}
                    >
                      <span className="text-2xl mb-1">🔥</span>
                      <span className="text-sm">Bán chạy</span>
                      <span className="text-xs text-gray-500 mt-1">
                        {products.filter((p) => p.bestSeller).length}
                      </span>
                    </button>

                    <button
                      className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeTab === "new"
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      onClick={() => setActiveTab("new")}
                    >
                      <span className="text-2xl mb-1">✨</span>
                      <span className="text-sm">Mới</span>
                      <span className="text-xs text-gray-500 mt-1">
                        {products.filter((p) => p.isNew).length}
                      </span>
                    </button>

                    <button
                      className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeTab === "sale"
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }`}
                      onClick={() => setActiveTab("sale")}
                    >
                      <span className="text-2xl mb-1">🏷️</span>
                      <span className="text-sm">Giảm giá</span>
                      <span className="text-xs text-gray-500 mt-1">
                        {products.filter((p) => p.discount > 0).length}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Loại giày */}
              <div className="mb-5 border-b border-gray-100 pb-4">
                <FilterSectionHeader
                  title="Loại gót"
                  isOpen={showShoeTypes}
                  toggle={() => setShowShoeTypes(!showShoeTypes)}
                />

                {showShoeTypes && (
                  <div className="mt-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeCategory === "all"
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                          }`}
                        onClick={() => setActiveCategory("all")}
                      >
                        <span className="text-xl mb-1">👠</span>
                        <span className="text-sm">Tất cả</span>
                      </button>

                      <button
                        className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeCategory === "stiletto"
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                          }`}
                        onClick={() => setActiveCategory("stiletto")}
                      >
                        <span className="text-xl mb-1">👠</span>
                        <span className="text-sm">Stiletto</span>
                      </button>

                      <button
                        className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeCategory === "block"
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                          }`}
                        onClick={() => setActiveCategory("block")}
                      >
                        <span className="text-xl mb-1">👡</span>
                        <span className="text-sm">Gót vuông</span>
                      </button>

                      <button
                        className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeCategory === "kitten"
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                          }`}
                        onClick={() => setActiveCategory("kitten")}
                      >
                        <span className="text-xl mb-1">👢</span>
                        <span className="text-sm">Gót thấp</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cải tiến bộ lọc giá - layout rộng hơn */}
              <div className="mb-5 border-b border-gray-100 pb-4">
                <FilterSectionHeader
                  title="Khoảng giá"
                  isOpen={showPriceRanges}
                  toggle={() => setShowPriceRanges(!showPriceRanges)}
                />

                {showPriceRanges && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${priceRange === "all"
                          ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        onClick={() => setPriceRange("all")}
                      >
                        Tất cả
                      </button>

                      <button
                        className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${priceRange === "under1m"
                          ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        onClick={() => setPriceRange("under1m")}
                      >
                        &lt; 1 triệu
                      </button>

                      <button
                        className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${priceRange === "1m-2m"
                          ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        onClick={() => setPriceRange("1m-2m")}
                      >
                        1 - 2 triệu
                      </button>

                      <button
                        className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${priceRange === "over2m"
                          ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        onClick={() => setPriceRange("over2m")}
                      >
                        &gt; 2 triệu
                      </button>
                    </div>

                    {/* Visual price range indicator */}
                    <div className="mt-4 px-2">
                      <div className="h-2 bg-gray-200 rounded-full relative">
                        <div
                          className={`absolute h-full bg-blue-500 rounded-full ${priceRange === "under1m"
                            ? "w-1/3"
                            : priceRange === "1m-2m"
                              ? "left-1/3 w-1/3"
                              : priceRange === "over2m"
                                ? "left-2/3 w-1/3"
                                : "w-full opacity-30"
                            }`}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>0đ</span>
                        <span>1tr</span>
                        <span>2tr</span>
                        <span>3tr+</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cải tiến bộ lọc đánh giá - giao diện trực quan hơn */}
              <div className="mb-5 border-b border-gray-100 pb-4">
                <FilterSectionHeader
                  title="Đánh giá"
                  isOpen={showRatings}
                  toggle={() => setShowRatings(!showRatings)}
                />

                {showRatings && (
                  <div className="mt-3 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <button
                        key={star}
                        className={`flex items-center w-full text-left rounded-lg p-3 transition ${ratingFilter === star
                          ? "bg-blue-50 text-blue-700 border-2 border-blue-200"
                          : "hover:bg-gray-50 text-gray-700 border border-gray-200"
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
                              size={18}
                            />
                          ))}
                        </div>
                        <span className="ml-2">trở lên</span>
                        <span className="ml-auto text-sm text-gray-500">
                          (
                          {
                            products.filter((p) => parseFloat(p.rating) >= star)
                              .length
                          }
                          )
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cải tiến bộ lọc thương hiệu - hiển thị logo */}
              <div className="mb-5">
                <FilterSectionHeader
                  title="Thương hiệu"
                  isOpen={showBrands}
                  toggle={() => setShowBrands(!showBrands)}
                />

                {showBrands && (
                  <div className="mt-3">
                    <div className="grid grid-cols-2 gap-3">
                      {brands.map((brand, index) => (
                        <button
                          key={index}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg transition ${brandFilters.includes(brand.name)
                            ? "bg-blue-50 border-2 border-blue-200"
                            : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                            }`}
                          onClick={() => toggleBrandFilter(brand.name)}
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden mb-2 bg-white p-1">
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span
                            className={`text-sm ${brandFilters.includes(brand.name)
                              ? "font-medium text-blue-700"
                              : "text-gray-700"
                              }`}
                          >
                            {brand.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Nút reset rõ ràng hơn */}
              <button
                className="w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center justify-center font-medium"
                onClick={resetFilters}
              >
                <FaTimes className="mr-2" />
                Xóa tất cả bộ lọc
              </button>
            </div>
          </div>

          <div className="md:w-2/3">
            {/* Search and filters bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-700 font-medium">
                  Hiển thị {filteredProducts.length} sản phẩm
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select className="border border-gray-300 rounded-lg pl-3 pr-8 py-2 bg-white focus:outline-none focus:border-blue-500">
                  <option value="featured">Nổi bật</option>
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>

                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-60 focus:outline-none focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {searchQuery && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchQuery("")}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick filter tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveTab("all")}
              >
                Tất cả
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "bestseller"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveTab("bestseller")}
              >
                Bán chạy
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "new"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveTab("new")}
              >
                Mới
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "sale"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveTab("sale")}
              >
                Giảm giá
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === "stiletto"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === "stiletto" ? "all" : "stiletto"
                  )
                }
              >
                Stiletto
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === "block"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === "block" ? "all" : "block"
                  )
                }
              >
                Gót vuông
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === "kitten"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === "kitten" ? "all" : "kitten"
                  )
                }
              >
                Gót thấp
              </button>
            </div>

            {/* Mobile filter button */}
            <div className="md:hidden mb-6">
              <button
                className="w-full py-2 px-4 bg-white rounded-lg shadow-sm flex items-center justify-between"
                onClick={() =>
                  document
                    .querySelector(".filter-overlay")
                    .classList.add("active")
                }
              >
                <div className="flex items-center">
                  <FaFilter className="mr-2 text-gray-500" />
                  <span>Lọc sản phẩm</span>
                </div>
                <FaChevronRight className="text-gray-500" />
              </button>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="text-7xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Không tìm thấy sản phẩm nào
                </h3>
                <p className="text-gray-600 mb-4">
                  Không có sản phẩm nào phù hợp với bộ lọc đã chọn. Hãy thử điều
                  chỉnh bộ lọc của bạn.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="h-full">
                    {renderProductCard(product)}
                  </div>
                ))}
              </div>
            )}



            {/* Mobile filter overlay */}
            <div className="fixed inset-0 filter-overlay z-50 transform translate-x-full transition-transform duration-300">
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() =>
                  document
                    .querySelector(".filter-overlay")
                    .classList.remove("active")
                }
              ></div>
              <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-md bg-white p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Lọc sản phẩm</h3>
                  <button
                    onClick={() =>
                      document
                        .querySelector(".filter-overlay")
                        .classList.remove("active")
                    }
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-3">Danh mục</h4>
                  <div className="flex flex-col space-y-2">
                    <button
                      className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${activeTab === "all" ? "active" : "hover:bg-gray-100"
                        }`}
                      onClick={() => {
                        setActiveTab("all");
                        document
                          .querySelector(".filter-overlay")
                          .classList.remove("active");
                      }}
                    >
                      <span className="mr-2 text-xl">🏆</span> Tất cả sản phẩm
                    </button>
                    <button
                      className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${activeTab === "bestseller"
                        ? "active"
                        : "hover:bg-gray-100"
                        }`}
                      onClick={() => {
                        setActiveTab("bestseller");
                        document
                          .querySelector(".filter-overlay")
                          .classList.remove("active");
                      }}
                    >
                      <span className="mr-2 text-xl">🔥</span> Bán chạy nhất
                    </button>
                    <button
                      className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${activeTab === "new" ? "active" : "hover:bg-gray-100"
                        }`}
                      onClick={() => {
                        setActiveTab("new");
                        document
                          .querySelector(".filter-overlay")
                          .classList.remove("active");
                      }}
                    >
                      <span className="mr-2 text-xl">✨</span> Sản phẩm mới
                    </button>
                    <button
                      className={`filter-button flex items-center justify-start px-4 py-2 rounded-lg transition-all ${activeTab === "sale" ? "active" : "hover:bg-gray-100"
                        }`}
                      onClick={() => {
                        setActiveTab("sale");
                        document
                          .querySelector(".filter-overlay")
                          .classList.remove("active");
                      }}
                    >
                      <span className="mr-2 text-xl">🏷️</span> Giảm giá
                    </button>
                  </div>
                </div>

                <button
                  className="btn-primary w-full py-3 px-4 rounded-lg bg-blue-600 text-white mb-4"
                  onClick={() => {
                    resetFilters();
                    document
                      .querySelector(".filter-overlay")
                      .classList.remove("active");
                  }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {products.length > 0 && (
          <div className="mt-16">
            <div className="section-title flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Bạn Có Thể Thích</h2>
              <a
                href="#"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
              >
                Xem tất cả <FaChevronRight className="ml-1" size={12} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {getBestSellers().map((product, index) => (
                <div
                  key={`related-${product.id || index}`}
                  className="product-card-wrapper"
                >
                  {renderProductCard(product)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-16 bg-white shadow-sm rounded-xl p-6">
            <div className="section-title flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Đánh Giá Từ Khách Hàng</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="review-card p-4 border border-gray-100 rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    <img
                      className="w-12 h-12 rounded-full object-cover mr-3"
                      src={review.image}
                      alt={review.name}
                    />
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <div className="text-sm text-gray-500">
                        {review.location}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-gray-600">{review.text}</p>

                  <div className="mt-4 text-right">
                    <button className="inline-flex items-center text-blue-600 hover:text-blue-700">
                      <FaRegThumbsUp className="mr-1" /> Hữu ích
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomensSports;

