import { useMemo, useState, useCallback } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

import { FaShieldAlt, FaStar, FaTruck } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import Button from "../Common/Button";
import Card, { CardBody, CardHeader } from "../Common/Card";
import { IMAGE_LIST } from "./constants.js";

import "./Hero.css";

function SliderArrow({ className, onClick, direction = "next" }) {
  const isNext = direction === "next";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next slide" : "Previous slide"}
      className={`${className} hero-arrow ${isNext ? "hero-next" : "hero-prev"}`}
    >
      {isNext ? (
        <HiChevronRight className="text-xl" />
      ) : (
        <HiChevronLeft className="text-xl" />
      )}
    </button>
  );
}

SliderArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  direction: PropTypes.oneOf(["next", "prev"]),
};

export default function Hero({ onOrderClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBeforeChange = useCallback((_, next) => {
    setCurrentSlide(next);
  }, []);

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      beforeChange: handleBeforeChange,
      nextArrow: <SliderArrow direction="next" />,
      prevArrow: <SliderArrow direction="prev" />,
      appendDots: (dots) => (
        <div className="hero-dots">
          <ul>{dots}</ul>
        </div>
      ),
      customPaging: (i) => (
        <button
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          className={`hero-dot ${i === currentSlide ? "active" : ""}`}
        />
      ),
    }),
    [currentSlide, handleBeforeChange],
  );

  return (
    <section className="hero-section">
      <Slider {...sliderSettings}>
        {IMAGE_LIST.map((slide) => (
          <div key={slide.id} className="outline-none">
            <div className="container mx-auto px-4 py-8 md:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Content */}
                <div>
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardHeader>
                      {!!slide.badge && (
                        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                          {slide.badge}
                        </span>
                      )}

                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-2">
                        {slide.title}
                      </h1>

                      {!!slide.subtitle && (
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                          {slide.subtitle}
                        </p>
                      )}
                    </CardHeader>

                    <CardBody>
                      {!!slide.description && (
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                          {slide.description}
                        </p>
                      )}

                      {!!slide.features?.length && (
                        <div className="flex flex-wrap gap-4 mb-6">
                          {slide.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
                            >
                              <FaStar className="text-yellow-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <Button
                          onClick={onOrderClick}
                          size="lg"
                          className="flex items-center gap-2"
                        >
                          {slide.buttonText || "Shop Now"}
                        </Button>

                        <Button
                          variant="secondary"
                          size="lg"
                          className="flex items-center gap-2"
                        >
                          <FaTruck />
                          Free Delivery
                        </Button>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <FaShieldAlt className="text-green-500" />
                          <span>Secure Payment</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>24/7 Support</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Image */}
                <div className="relative">
                  <div className="relative max-w-md mx-auto">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full h-auto object-contain select-none"
                      draggable="false"
                      loading="lazy"
                    />

                    {!!slide.discount && (
                      <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex flex-col items-center justify-center text-white shadow-xl">
                        <span className="text-xl font-bold">
                          {slide.discount}
                        </span>
                        <span className="text-xs">OFF</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

Hero.propTypes = {
  onOrderClick: PropTypes.func,
};
