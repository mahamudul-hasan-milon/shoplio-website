import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import BannerImg from "../../assets/women/women2.jpg";

import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import { MdLocalOffer, MdArrowForward } from "react-icons/md";
import { FaShoppingBag, FaArrowRight } from "react-icons/fa";

const INITIAL_COUNTDOWN = {
  days: 3,
  hours: 12,
  minutes: 30,
  seconds: 0,
};

const FEATURES = [
  {
    id: 1,
    icon: <GrSecure />,
    title: "Quality Products",
    description: "100% authentic and premium quality guaranteed",
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    icon: <IoFastFood />,
    title: "Fast Delivery",
    description: "Free delivery on orders above $50",
    iconColor: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    id: 3,
    icon: <GiFoodTruck />,
    title: "Easy Payment",
    description: "Multiple secure payment options",
    iconColor: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: 4,
    icon: <MdLocalOffer />,
    title: "Get Offers",
    description: "Exclusive deals for members",
    iconColor: "text-orange-600",
    bg: "bg-orange-50",
  },
];

function pad2(num) {
  return String(num).padStart(2, "0");
}

function tick(prev) {
  const total =
    prev.days * 86400 + prev.hours * 3600 + prev.minutes * 60 + prev.seconds;

  if (total <= 0) return prev;

  const nextTotal = total - 1;

  const days = Math.floor(nextTotal / 86400);
  const hours = Math.floor((nextTotal % 86400) / 3600);
  const minutes = Math.floor((nextTotal % 3600) / 60);
  const seconds = nextTotal % 60;

  return { days, hours, minutes, seconds };
}

export default function Banner({ onShopNow, onViewDeals }) {
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCountdown((prev) => tick(prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const countdownItems = useMemo(() => {
    return [
      { key: "days", label: "Days", value: countdown.days },
      { key: "hours", label: "Hours", value: countdown.hours },
      { key: "minutes", label: "Minutes", value: countdown.minutes },
      { key: "seconds", label: "Seconds", value: countdown.seconds },
    ];
  }, [countdown]);

  return (
    <section
      className="
        relative w-full overflow-hidden
        bg-gradient-to-br from-blue-50 via-white to-purple-50
        dark:from-gray-900 dark:via-gray-900 dark:to-gray-800
        pt-14 pb-16
      "
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-blue-300 to-transparent rounded-full opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-r from-purple-300 to-transparent rounded-full opacity-20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={`transform transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="relative max-w-[460px] mx-auto">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                <img
                  src={BannerImg}
                  alt="Winter Sale"
                  className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Discount Badge */}
                <div className="absolute -top-4 -right-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex flex-col items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-xl">50%</span>
                    <span className="text-white text-xs">OFF</span>
                  </div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1.2K+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Happy Customers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transform transition-all duration-700 delay-150 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🎁 Limited Time Offer
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Winter Sale
              </span>
            </h1>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5">
              Up to 50% Off
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-xl">
              Celebrate this winter with Shoplio exclusive Winter Sale! Enjoy
              incredible discounts of up to 50% on a wide range of products.
              Hurry, grab your favorites now and make your winter shopping
              experience unforgettable and budget-friendly!
            </p>

            {/* Countdown */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Offer ends in:
              </p>

              <div className="flex flex-wrap gap-3">
                {countdownItems.map((item) => (
                  <div key={item.key} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white/80 dark:bg-gray-900 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                        {pad2(item.value)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {FEATURES.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  className={`
                    text-left p-4 rounded-xl shadow-sm border border-gray-100
                    dark:border-gray-700 dark:bg-gray-900
                    transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg
                    ${feature.bg}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-3 rounded-full bg-white/70 dark:bg-gray-800 ${feature.iconColor}`}
                    >
                      <span className="text-xl">{feature.icon}</span>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onShopNow}
                className="
                  flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white
                  py-4 px-8 rounded-xl font-semibold
                  flex items-center justify-center gap-3
                  transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl
                "
              >
                <FaShoppingBag className="text-lg" />
                <span>Shop Now</span>
                <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onViewDeals}
                className="
                  flex-1 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400
                  py-4 px-8 rounded-xl font-semibold border border-blue-200 dark:border-gray-700
                  flex items-center justify-center gap-3
                  transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800
                "
              >
                <MdArrowForward className="text-xl" />
                <span>View All Deals</span>
              </button>
            </div>

            {/* Trust */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Secure Payment
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  24/7 Support
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Free Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Banner.propTypes = {
  onShopNow: PropTypes.func,
  onViewDeals: PropTypes.func,
};
