import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Image1 from "../../assets/hero/women.png";
import Image2 from "../../assets/hero/shopping.png";
import Image3 from "../../assets/hero/sale.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaArrowLeft,
  FaArrowRight,
  FaShoppingBag,
  FaTag,
  FaFire,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 70% off on all Women's Wear",
    subtitle: "Winter Fashion Collection",
    description:
      "Shoplio Winter Sale! Enjoy up to 70% off on premium women's wear. Upgrade your wardrobe with stylish, high-quality clothing at unbeatable prices.",
    badge: "Trending Now",
    badgeColor: "bg-gradient-to-r from-pink-500 to-rose-500",
    buttonText: "Shop Women",
    features: ["Free Shipping", "Easy Returns", "Premium Quality"],
    discount: "70% OFF",
    category: "Women's Fashion",
  },
  {
    id: 2,
    img: Image2,
    title: "50% off on Men's Collection",
    subtitle: "Smart Casual Wear",
    description:
      "Discover our exclusive men's collection with 50% off. From formal wear to casual outfits, find the perfect style for every occasion.",
    badge: "Best Seller",
    badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    buttonText: "Shop Men",
    features: ["New Arrivals", "Size Guide", "Style Advice"],
    discount: "50% OFF",
    category: "Men's Fashion",
  },
  {
    id: 3,
    img: Image3,
    title: "Flash Sale: Up to 80% off Everything!",
    subtitle: "Limited Time Offer",
    description:
      "Massive clearance sale! Grab up to 80% off on all products. From clothing to accessories, enjoy incredible savings.",
    badge: "Flash Sale",
    badgeColor: "bg-gradient-to-r from-orange-500 to-red-500",
    buttonText: "Shop All Deals",
    features: ["Last Chance", "Limited Stock", "Hot Deals"],
    discount: "80% OFF",
    category: "All Categories",
  },
];

const Hero = ({ handleOrderPopup }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);
  const progressInterval = useRef(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (autoplay) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 100 / (4000 / 100);
        });
      }, 100);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
  }, [autoplay]);

  // Custom Arrow Components
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-xl items-center justify-center text-gray-800 hover:text-blue-600 transform transition-all duration-300 hover:scale-110 group"
      aria-label="Next slide"
      type="button"
    >
      <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
    </button>
  );

  NextArrow.propTypes = {
    onClick: PropTypes.func,
  };

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-xl items-center justify-center text-gray-800 hover:text-blue-600 transform transition-all duration-300 hover:scale-110 group"
      aria-label="Previous slide"
      type="button"
    >
      <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
    </button>
  );

  PrevArrow.propTypes = {
    onClick: PropTypes.func,
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    pauseOnHover: true,
    pauseOnFocus: true,
    beforeChange: (_, next) => {
      setCurrentSlide(next);
      setProgress(0);
    },
    appendDots: (dots) => (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <ul className="flex space-x-3">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        type="button"
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === currentSlide
            ? "bg-gradient-to-r from-blue-600 to-purple-600 w-6"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleDotClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  const handleShopCategory = (category) => {
    console.log(`Navigating to ${category}`);
    // Add navigation logic here
    if (handleOrderPopup) {
      handleOrderPopup();
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[500px] sm:min-h-[650px] flex items-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Floating Discount Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="animate-bounce bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-lg font-bold flex items-center gap-1 text-sm">
          <FaFire /> FLASH SALE
        </div>
      </div>

      <div className="container relative z-10 py-4 sm:py-8 px-4 sm:px-6">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200/50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Control Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
          <button
            onClick={toggleAutoplay}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-300"
            aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
            type="button"
          >
            {autoplay ? <FaPause /> : <FaPlay />}
          </button>

          {/* Slide Counter */}
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg text-xs sm:text-sm font-medium">
            <span className="text-blue-600">{currentSlide + 1}</span>
            <span className="text-gray-400"> / {ImageList.length}</span>
          </div>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {ImageList.map((data) => (
            <div key={data.id} className="outline-none focus:outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                {/* Text Content Section */}
                <div className="order-2 lg:order-1">
                  {/* Badge */}
                  <div className="mb-4">
                    <span
                      className={`${data.badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 shadow-lg`}
                    >
                      <FaTag /> {data.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2">
                      <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                        {data.title}
                      </span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                      {data.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed max-w-md">
                    {data.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {data.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm text-xs"
                      >
                        <FaStar className="text-yellow-500" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button
                      onClick={() => handleShopCategory(data.category)}
                      className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                      type="button"
                    >
                      <FaShoppingBag className="text-sm" />
                      {data.buttonText}
                      <BsArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    <button
                      onClick={handleOrderPopup}
                      className="group bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 hover:border-blue-400 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                      type="button"
                    >
                      <FaTruck />
                      Free Delivery
                    </button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <FaShieldAlt className="text-green-500" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="order-1 lg:order-2 relative mb-6 lg:mb-0">
                  <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                    {/* Discount Circle */}
                    <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 z-10">
                      <div className="relative">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex flex-col items-center justify-center shadow-xl">
                          <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                            {data.discount.split(" ")[0]}
                          </span>
                          <span className="text-white text-xs">OFF</span>
                        </div>
                      </div>
                    </div>

                    {/* Main Image Container */}
                    <div className="relative">
                      <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-md opacity-20"></div>
                      <img
                        src={data.img}
                        alt={data.title}
                        className="relative w-full h-auto object-contain transform transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Floating Stats */}
                    <div className="absolute -bottom-3 left-2 sm:-bottom-4 sm:left-4 bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-3 shadow-lg">
                      <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                          2K+
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Customers
                        </div>
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute bottom-3 right-2 sm:bottom-4 sm:right-4 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                      {data.category.split(" ")[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Manual Slide Navigation (Mobile) */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {ImageList.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Products Sold", value: "10K+", icon: "📦" },
            { label: "Happy Customers", value: "98%", icon: "😊" },
            { label: "Delivery Speed", value: "<24h", icon: "⚡" },
            { label: "Reviews", value: "4.8★", icon: "⭐" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 text-center shadow-md"
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Prop validation
Hero.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired,
};

// Default props
Hero.defaultProps = {
  handleOrderPopup: () => console.log("Order popup triggered"),
};

export default Hero;
