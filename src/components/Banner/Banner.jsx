import { useState, useEffect } from "react";
import BannerImg from "../../assets/women/women2.jpg";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import { MdLocalOffer, MdArrowForward } from "react-icons/md";
import { FaShoppingBag, FaArrowRight } from "react-icons/fa";
import "../Banner/Banner.css";

const Banner = () => {
  const [countdown, setCountdown] = useState({
    days: 3,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 1,
      icon: <GrSecure />,
      title: "Quality Products",
      description: "100% authentic and premium quality guaranteed",
      color: "bg-gradient-to-br from-blue-100 to-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      icon: <IoFastFood />,
      title: "Fast Delivery",
      description: "Free delivery on orders above $50",
      color: "bg-gradient-to-br from-purple-100 to-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      icon: <GiFoodTruck />,
      title: "Easy Payment",
      description: "Multiple secure payment options",
      color: "bg-gradient-to-br from-green-100 to-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 4,
      icon: <MdLocalOffer />,
      title: "Get Offers",
      description: "Exclusive deals for members",
      color: "bg-gradient-to-br from-orange-100 to-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const handleShopNow = () => {
    // Navigate to products page or trigger modal
    console.log("Navigating to shop...");
    // Add your navigation logic here
  };

  const handleFeatureClick = (featureId) => {
    console.log(`Feature ${featureId} clicked`);
    // Add specific functionality for each feature
  };

  return (
    <div className="relative min-h-[600px] flex justify-center items-center py-12 sm:py-0 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-blue-200 to-transparent rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-r from-purple-200 to-transparent rounded-full opacity-20 blur-3xl"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section with Enhanced Effects */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="relative max-w-[450px] mx-auto">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-blue-200/50 group">
                <img
                  src={BannerImg}
                  alt="Winter Sale - Shoplio"
                  className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Discount Badge */}
                <div className="absolute -top-4 -right-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex flex-col items-center justify-center transform rotate-12 shadow-xl animate-pulse">
                      <span className="text-white font-bold text-xl">50%</span>
                      <span className="text-white text-xs">OFF</span>
                    </div>
                    <div className="absolute inset-0 border-2 border-red-300 border-dashed rounded-full animate-spin-slow"></div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1.2K+</div>
                  <div className="text-xs text-gray-500">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {/* Countdown Timer */}
            <div className="mb-8">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🎁 Limited Time Offer
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Winter Sale
                <span className="block text-3xl md:text-4xl text-gray-800 mt-2">
                  Up to 50% Off
                </span>
              </h1>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Celebrate this winter with Shoplio exclusive Winter Sale! Enjoy
                incredible discounts of up to 50% on a wide range of products.
                Hurry, grab your favorites now and make your winter shopping
                experience unforgettable and budget-friendly!
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-3">Offer ends in:</p>
              <div className="flex gap-3">
                {Object.entries(countdown).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-b from-blue-100 to-white rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-blue-700">
                        {value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 capitalize">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`p-4 rounded-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                    hoveredIcon === feature.id
                      ? "shadow-xl scale-105"
                      : "shadow-md"
                  } ${feature.color}`}
                  onMouseEnter={() => setHoveredIcon(feature.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-3 rounded-full ${feature.color} ${feature.iconColor}`}
                    >
                      <span className="text-xl">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleShopNow}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-3 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 group"
              >
                <FaShoppingBag className="text-lg" />
                <span>Shop Now</span>
                <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-2" />
              </button>

              <button className="flex-1 bg-white text-blue-600 py-4 px-8 rounded-xl font-semibold border-2 border-blue-200 flex items-center justify-center gap-3 transform transition-all duration-300 hover:bg-blue-50 hover:border-blue-300">
                <MdArrowForward className="text-xl" />
                <span>View All Deals</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Secure Payment
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  24/7 Support
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Free Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
