import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Img1 from "../../assets/shirt/shirt.png";
import Img2 from "../../assets/shirt/shirt2.png";
import Img3 from "../../assets/shirt/shirt3.png";
import {
  FaStar,
  FaFire,
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaTruck,
  FaShieldAlt,
  FaTag,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";
import "../TopProducts/TopProducts.css";

// Extended product data
const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Premium Casual Wear",
    description:
      "Comfortable and stylish casual wear for everyday occasions—perfect blend of style and ease with premium cotton fabric.",
    rating: 4.9,
    reviews: 124,
    price: 49.99,
    originalPrice: 79.99,
    discount: 37,
    tags: ["Bestseller", "New Arrival", "Trending"],
    features: ["100% Cotton", "Machine Wash", "Slim Fit"],
    colors: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    fastDelivery: true,
    soldThisMonth: 342,
    category: "Men's Casual",
  },
  {
    id: 2,
    img: Img2,
    title: "Designer Printed Shirt",
    description:
      "Trendy printed shirts with unique designs that make you stand out effortlessly. Perfect for parties and casual outings.",
    rating: 4.7,
    reviews: 89,
    price: 59.99,
    originalPrice: 89.99,
    discount: 33,
    tags: ["Limited Edition", "Premium", "Designer"],
    features: ["Premium Prints", "Breathable Fabric", "Regular Fit"],
    colors: ["#1e293b", "#64748b", "#334155", "#0f172a"],
    sizes: ["S", "M", "L"],
    inStock: true,
    fastDelivery: true,
    soldThisMonth: 218,
    category: "Men's Fashion",
  },
  {
    id: 3,
    img: Img3,
    title: "Elegant Women's Blouse",
    description:
      "Elegant and fashionable women's shirts crafted for style, comfort and versatility. Perfect for office and casual wear.",
    rating: 4.8,
    reviews: 156,
    price: 44.99,
    originalPrice: 64.99,
    discount: 30,
    tags: ["Women's Choice", "Office Wear", "Versatile"],
    features: ["Silk Blend", "Easy Care", "Tailored Fit"],
    colors: ["#ec4899", "#8b5cf6", "#06b6d4", "#f97316"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    fastDelivery: false,
    soldThisMonth: 289,
    category: "Women's Fashion",
  },
];

const TopProducts = ({ handleOrderPopup }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [countdown, setCountdown] = useState({
    hours: 6,
    minutes: 30,
    seconds: 0,
  });

  // Countdown timer for flash sale
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWishlistToggle = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleQuickView = (product) => {
    console.log("Quick view:", product.title);
    // Implement quick view modal here
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 fill-current" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 fill-current" />);
      } else {
        stars.push(
          <FaStar key={i} className="text-gray-300 dark:text-gray-600" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 px-4 py-2 rounded-full mb-4">
                <FaFire className="text-red-500" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  🔥 Hot This Week
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                Top Rated Products
              </h1>

              <p className="text-gray-600 dark:text-gray-400">
                Discover our best products—high-quality, trending and
                customer-approved items you will love every time! Curated for
                excellence and style.
              </p>
            </div>

            {/* Flash Sale Countdown */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <IoMdFlash className="text-2xl text-white" />
                <h3 className="text-lg font-bold text-white">
                  Flash Sale Ends In
                </h3>
              </div>

              <div className="flex gap-4">
                {Object.entries(countdown).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-xs text-white/90 mt-2 capitalize">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 bg-white text-red-600 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Shop All Flash Deals
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <FaTruck className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium">Free Shipping</p>
              <p className="text-xs text-gray-500">On orders over $50</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium">Quality Checked</p>
              <p className="text-xs text-gray-500">100% Authentic</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <FaShieldAlt className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="font-medium">Secure Payment</p>
              <p className="text-xs text-gray-500">SSL Protected</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <FaTag className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="font-medium">Best Price</p>
              <p className="text-xs text-gray-500">Price Match Guarantee</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ProductsData.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                  <FaTag /> {product.discount}% OFF
                </div>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => handleWishlistToggle(product.id)}
                className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 ${
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

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 dark:to-black/20 z-0"></div>
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 p-4"
                />

                {/* Quick Actions Overlay */}
                {hoveredProduct === product.id && (
                  <div className="absolute inset-0 bg-black/30 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center gap-4 animate-fade-in z-20">
                    <button
                      onClick={() => handleQuickView(product)}
                      className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg transform transition-all hover:scale-110"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (handleOrderPopup) handleOrderPopup();
                      }}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg transform transition-all hover:scale-110"
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                )}

                {/* Fast Delivery Badge */}
                {product.fastDelivery && (
                  <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <FaTruck className="text-xs" />
                    Fast Delivery
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category and Tags */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex gap-1">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500 text-sm">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Color Options */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Available Colors:
                  </p>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={`Color ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${product.price}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Save $
                        {(product.originalPrice - product.price).toFixed(2)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500">Sold This Month</p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {product.soldThisMonth}+
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (handleOrderPopup) handleOrderPopup();
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity group/btn"
                    >
                      <FaShoppingCart />
                      Add to Cart
                      <FaArrowRight className="transform transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (handleOrderPopup) handleOrderPopup();
                      }}
                      className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-xl font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Want to See More?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore our complete collection of premium products
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                View All Products
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Shop by Category
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              500+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Products</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              10K+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Happy Customers
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              98%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Satisfaction Rate
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Customer Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop validation
TopProducts.propTypes = {
  handleOrderPopup: PropTypes.func,
};

TopProducts.defaultProps = {
  handleOrderPopup: () => console.log("Order popup triggered"),
};

export default TopProducts;
