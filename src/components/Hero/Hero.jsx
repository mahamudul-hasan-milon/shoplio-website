import { useMemo, useRef, useState, useCallback } from "react";
import Slider from "react-slick";
import { FaShieldAlt, FaStar, FaTruck } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import Button from "../Common/Button";
import Card, { CardBody, CardHeader } from "../Common/Card";
import { IMAGE_LIST } from "./constants";
import PropTypes from "prop-types";

function SliderArrow({ direction = "next", onClick }) {
  const isNext = direction === "next";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next slide" : "Previous slide"}
      className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 
        bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg 
        flex items-center justify-center hover:scale-110 
        transition-transform duration-300
        ${isNext ? "right-4" : "left-4"}`}
    >
      {isNext ? (
        <HiChevronRight className="text-xl" />
      ) : (
        <HiChevronLeft className="text-xl" />
      )}
    </button>
  );
}

export default function Hero({ onOrderClick }) {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBeforeChange = useCallback((_, next) => {
    setCurrentSlide(next);
  }, []);

  const sliderSettings = useMemo(() => {
    return {
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <ul className="flex space-x-2">{dots}</ul>
        </div>
      ),
      customPaging: (i) => (
        <button
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === currentSlide
              ? "bg-blue-600 w-6"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        />
      ),
    };
  }, [currentSlide, handleBeforeChange]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Slider ref={sliderRef} {...sliderSettings}>
        {IMAGE_LIST.map((slide) => (
          <div key={slide.id} className="outline-none">
            <div className="container mx-auto px-4 py-8 md:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div>
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardHeader>
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                        {slide.badge}
                      </span>

                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-2">
                        {slide.title}
                      </h1>

                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {slide.subtitle}
                      </p>
                    </CardHeader>

                    <CardBody>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {slide.description}
                      </p>

                      {!!slide.features?.length && (
                        <div className="flex flex-wrap gap-4 mb-6">
                          {slide.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 text-sm"
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
                          Shop Now
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

                      <div className="flex items-center gap-6 text-sm text-gray-500">
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
                      className="w-full h-auto object-contain"
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
SliderArrow.propTypes = {
  direction: PropTypes.oneOf(["next", "prev"]),
  onClick: PropTypes.func,
};

Hero.propTypes = {
  onOrderClick: PropTypes.func,
};
