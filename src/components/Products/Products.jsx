import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Img1 from "../../assets/women/women.png";
import Img2 from "../../assets/women/women2.jpg";
import Img3 from "../../assets/women/women3.jpg";
import Img4 from "../../assets/women/women4.jpg";
import {
  FaStar,
  FaHeart,
  FaEye,
  FaShoppingCart,
  FaFire,
  FaTag,
  FaFilter,
  FaSortAmountDown,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import "../Products/Products.css";

// Extended product data with more details
const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Elegant Ethnic Dress",
    rating: 4.9,
    reviews: 124,
    color: "White & Gold",
    price: 89.99,
    originalPrice: 129.99,
    category: "Women's Ethnic",
    tags: ["New", "Best Seller", "Limited"],
    inStock: true,
    fastDelivery: true,
    discount: 30,
    description:
      "Beautifully crafted ethnic dress with intricate embroidery work.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Red", "Blue", "Green"],
  },
  {
    id: 2,
    img: Img2,
    title: "Modern Western Wear",
    rating: 4.5,
    reviews: 89,
    color: "Scarlet Red",
    price: 59.99,
    originalPrice: 79.99,
    category: "Women's Western",
    tags: ["Trending", "Sale"],
    inStock: true,
    fastDelivery: true,
    discount: 25,
    description:
      "Stylish western outfit perfect for casual outings and parties.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Red", "Black", "Navy"],
  },
  {
    id: 3,
    img: Img3,
    title: "Designer Sunglasses",
    rating: 4.7,
    reviews: 203,
    color: "Brown & Gold",
    price: 39.99,
    originalPrice: 59.99,
    category: "Accessories",
    tags: ["UV Protected", "Premium"],
    inStock: true,
    fastDelivery: false,
    discount: 33,
    description:
      "High-quality sunglasses with UV400 protection and stylish design.",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tortoise"],
  },
  {
    id: 4,
    img: Img4,
    title: "Printed Cotton T-Shirt",
    rating: 4.4,
    reviews: 67,
    color: "Sunshine Yellow",
    price: 24.99,
    originalPrice: 34.99,
    category: "Men's Casual",
    tags: ["Comfort", "Summer"],
    inStock: true,
    fastDelivery: true,
    discount: 28,
    description:
      "100% cotton t-shirt with unique printed design for daily wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Yellow", "White", "Gray", "Blue"],
  },
  {
    id: 5,
    img: Img2,
    title: "Fashion Crop Top",
    rating: 4.6,
    reviews: 156,
    color: "Blush Pink",
    price: 34.99,
    originalPrice: 49.99,
    category: "Women's Fashion",
    tags: ["New", "Summer"],
    inStock: false,
    fastDelivery: true,
    discount: 30,
    description: "Trendy crop top perfect for summer fashion and casual wear.",
    sizes: ["XS", "S", "M"],
    colors: ["Pink", "White", "Lavender"],
  },
  {
    id: 6,
    img: Img1,
    title: "Traditional Saree",
    rating: 4.8,
    reviews: 212,
    color: "Royal Blue",
    price: 129.99,
    originalPrice: 199.99,
    category: "Women's Ethnic",
    tags: ["Premium", "Festival"],
    inStock: true,
    fastDelivery: false,
    discount: 35,
    description: "Authentic traditional saree with silk fabric and zari work.",
    sizes: ["Free Size"],
    colors: ["Blue", "Red", "Green", "Purple"],
  },
  {
    id: 7,
    img: Img3,
    title: "Sporty Watch",
    rating: 4.3,
    reviews: 98,
    color: "Matte Black",
    price: 69.99,
    originalPrice: 99.99,
    category: "Accessories",
    tags: ["Waterproof", "Fitness"],
    inStock: true,
    fastDelivery: true,
    discount: 30,
    description: "Sports watch with multiple fitness tracking features.",
    sizes: ["Adjustable"],
    colors: ["Black", "Blue", "Silver"],
  },
  {
    id: 8,
    img: Img4,
    title: "Casual Denim Jacket",
    rating: 4.7,
    reviews: 178,
    color: "Classic Blue",
    price: 79.99,
    originalPrice: 119.99,
    category: "Men's Outerwear",
    tags: ["Denim", "Vintage"],
    inStock: true,
    fastDelivery: true,
    discount: 33,
    description: "Premium denim jacket with vintage wash and modern fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Gray"],
  },
];

const categories = [
  "All",
  "Women's Ethnic",
  "Women's Western",
  "Men's Casual",
  "Accessories",
  "Men's Outerwear",
];
const sortOptions = [
  "Popularity",
  "Price: Low to High",
  "Price: High to Low",
  "Rating",
  "Newest",
];

const Products = ({ handleOrderPopup }) => {
  const [products, setProducts] = useState(ProductsData);
  const [wishlist, setWishlist] = useState([]);
  const [setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...ProductsData];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Popularity (default)
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    setProducts(filtered);
  }, [selectedCategory, sortBy, searchQuery, priceRange]);

  const handleWishlistToggle = (productId, e) => {
    e.stopPropagation();
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    if (handleOrderPopup) {
      handleOrderPopup();
    }
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleShare = (product, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} on Shoplio!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `${product.title} - ${window.location.href}`
      );
      alert("Product link copied to clipboard!");
    }
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSortBy("Popularity");
    setSearchQuery("");
    setPriceRange([0, 200]);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 px-4 py-2 rounded-full mb-4">
            <FaFire className="text-orange-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Top Selling Products
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            Discover Our Collection
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            High-quality, stylish and durable products designed to make your
            everyday life easier and enjoyable. Curated for the modern
            lifestyle.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, brands, and categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FaSortAmountDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FaFilter />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="text-blue-600"
                        />
                        <span
                          className={
                            selectedCategory === category
                              ? "text-blue-600 font-medium"
                              : "text-gray-600 dark:text-gray-400"
                          }
                        >
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>$0</span>
                      <span>$100</span>
                      <span>$200</span>
                    </div>
                  </div>
                </div>

                {/* In Stock Filter */}
                <div>
                  <h4 className="font-medium mb-3">Availability</h4>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span>In Stock Only</span>
                  </label>
                </div>

                {/* Fast Delivery Filter */}
                <div>
                  <h4 className="font-medium mb-3">Delivery</h4>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span>Fast Delivery</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <FaTag /> {product.discount}% OFF
                  </div>
                </div>
              )}

              {/* Out of Stock Overlay */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg font-bold">
                    Out of Stock
                  </div>
                </div>
              )}

              {/* Quick Actions Overlay */}
              {hoveredProduct === product.id && (
                <div className="absolute inset-0 bg-black/10 dark:bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center gap-4 animate-fade-in">
                  <button
                    onClick={(e) => handleWishlistToggle(product.id, e)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-110 ${
                      wishlist.includes(product.id)
                        ? "bg-red-500 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    }`}
                  >
                    <FaHeart
                      className={
                        wishlist.includes(product.id) ? "fill-current" : ""
                      }
                    />
                  </button>
                  <button
                    onClick={() => handleQuickView(product)}
                    className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg transform transition-all hover:scale-110"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={(e) => handleShare(product, e)}
                    className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg transform transition-all hover:scale-110"
                  >
                    <IoShareSocialOutline />
                  </button>
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Fast Delivery Badge */}
                {product.fastDelivery && (
                  <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    🚚 Fast Delivery
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.title}
                </h3>

                {/* Color */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Color: {product.color}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!product.inStock}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleOrderPopup && handleOrderPopup()}
                    disabled={!product.inStock}
                    className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">😞</div>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Load More Products
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Quick View</h2>
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="text-2xl hover:text-red-500 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={quickViewProduct.img}
                      alt={quickViewProduct.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>
                  {/* Thumbnail Gallery */}
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200"
                      >
                        <img
                          src={quickViewProduct.img}
                          alt={`View ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {quickViewProduct.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {quickViewProduct.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="font-bold">
                        {quickViewProduct.rating}
                      </span>
                      <span className="text-gray-500">
                        ({quickViewProduct.reviews} reviews)
                      </span>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        quickViewProduct.inStock
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {quickViewProduct.inStock ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Color</h4>
                      <div className="flex gap-2">
                        {quickViewProduct.colors.map((color, i) => (
                          <button
                            key={i}
                            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-500"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Size</h4>
                      <div className="flex gap-2">
                        {quickViewProduct.sizes.map((size, i) => (
                          <button
                            key={i}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold">
                          ${quickViewProduct.price}
                        </span>
                        {quickViewProduct.originalPrice >
                          quickViewProduct.price && (
                          <span className="ml-2 text-lg text-gray-500 line-through">
                            ${quickViewProduct.originalPrice}
                          </span>
                        )}
                      </div>
                      {quickViewProduct.discount > 0 && (
                        <div className="text-red-500 font-bold">
                          Save {quickViewProduct.discount}%
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={(e) => handleAddToCart(quickViewProduct, e)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleOrderPopup && handleOrderPopup()}
                        className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Prop validation
Products.propTypes = {
  handleOrderPopup: PropTypes.func,
};

Products.defaultProps = {
  handleOrderPopup: () => console.log("Order popup triggered"),
};

export default Products;
