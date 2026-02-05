import { useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";

import Card from "../Common/Card";
import Button from "../Common/Button";

import { PRODUCTS } from "../../utils/constants";
import { formatPrice } from "../../utils/helpers";

import { FaStar, FaHeart, FaShoppingCart, FaTag } from "react-icons/fa";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function Products({ onOrderClick = null }) {
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(() => {
    return ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  }, []);

  const filteredProducts = useMemo(() => {
    let data = [...PRODUCTS];

    if (selectedCategory !== "All") {
      data = data.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "price-low") data.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") data.sort((a, b) => b.price - a.price);

    return data;
  }, [selectedCategory, sortBy]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our curated collection of premium products.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onWishlistToggle={() => toggleWishlist(product.id)}
              onAddToCart={() => onOrderClick?.(product.id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
}

Products.propTypes = {
  onOrderClick: PropTypes.func,
};

function ProductCard({ product, isWishlisted, onWishlistToggle, onAddToCart }) {
  const rating = Number(product.rating || 4);
  const reviews = Number(product.reviews || 120);
  const discount = Number(product.discount || 0);

  return (
    <Card hover className="relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            <FaTag /> {discount}% OFF
          </div>
        </div>
      )}

      {/* Wishlist */}
      <button
        type="button"
        onClick={onWishlistToggle}
        className="absolute top-3 right-3 z-10"
        aria-label="Add to wishlist"
      >
        <FaHeart
          className={`text-xl ${
            isWishlisted ? "text-red-500 fill-current" : "text-gray-400"
          }`}
        />
      </button>

      {/* Image Placeholder */}
      <div className="h-48 overflow-hidden rounded-lg mb-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <span className="text-gray-400 text-sm">No Image</span>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {product.category} • {product.color} • Size {product.size}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={`text-sm ${
                i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">({reviews})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold">
            {formatPrice(product.price)}
          </span>
        </div>

        <Button
          onClick={onAddToCart}
          fullWidth
          className="flex items-center justify-center gap-2"
        >
          <FaShoppingCart />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    category: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    discount: PropTypes.number,
  }).isRequired,
  isWishlisted: PropTypes.bool.isRequired,
  onWishlistToggle: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
