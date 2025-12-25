import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaRegStar,
  FaStarHalfAlt,
  FaThumbsUp,
  FaCheckCircle,
  FaPlay,
  FaPause,
  FaArrowLeft,
  FaArrowRight,
  FaShare,
  FaHeart,
} from "react-icons/fa";
import { IoMdQuote } from "react-icons/io";
import "../Testimonials/Testimonials.css";

const TestimonialData = [
  {
    id: 1,
    name: "Milon Ahmed",
    role: "Fashion Influencer",
    text: "Shoplio transformed my shopping experience! The quality of products is exceptional, and delivery was faster than expected. Their customer service team is incredibly responsive and helpful.",
    img: "https://i.ibb.co.com/sJWyQc3S/449489881-1929331690825289-4972121263714079550-n.jpg",
    rating: 5,
    date: "2 days ago",
    verified: true,
    social: "@milonstyle",
    likes: 42,
    helpful: 56,
    location: "Dhaka, Bangladesh",
    purchase: "Winter Collection 2024",
    tags: ["Fast Delivery", "Great Quality", "Excellent Service"],
  },
  {
    id: 2,
    name: "Tacin Sorker",
    role: "Business Professional",
    text: "The attention to detail in packaging and the overall shopping experience is outstanding. I received exactly what I ordered, and the quality exceeded my expectations. Will definitely shop again!",
    img: "https://i.ibb.co.com/qFm89HkM/tacin.jpg",
    rating: 4.5,
    date: "1 week ago",
    verified: true,
    social: "@tacinprofessional",
    likes: 38,
    helpful: 45,
    location: "Chittagong, Bangladesh",
    purchase: "Office Formal Wear",
    tags: ["Perfect Fit", "Premium Quality", "Value for Money"],
  },
  {
    id: 3,
    name: "Mahfujul Hasan",
    role: "Tech Enthusiast",
    text: "As someone who shops online frequently, I can confidently say Shoplio provides one of the best experiences. The website is intuitive, and their return policy is customer-friendly. Highly recommended!",
    img: "https://i.ibb.co.com/ZpNjJZjQ/mahfuj.jpg",
    rating: 5,
    date: "3 days ago",
    verified: true,
    social: "@mahfujtech",
    likes: 51,
    helpful: 63,
    location: "Sylhet, Bangladesh",
    purchase: "Electronics & Gadgets",
    tags: ["Easy Returns", "User Friendly", "Reliable"],
  },
  {
    id: 4,
    name: "Taposh Barai",
    role: "Lifestyle Blogger",
    text: "The variety and quality of products available on Shoplio is impressive. I love how they curate their collections. The checkout process is seamless, and shipping is always on time.",
    img: "https://i.ibb.co.com/Fbkm3bqn/taposh.jpg",
    rating: 4.8,
    date: "2 weeks ago",
    verified: true,
    social: "@taposhlifestyle",
    likes: 29,
    helpful: 34,
    location: "Rajshahi, Bangladesh",
    purchase: "Summer Fashion 2024",
    tags: ["Great Selection", "Fast Shipping", "Trustworthy"],
  },
  {
    id: 5,
    name: "Sarah Johnson",
    role: "Interior Designer",
    text: "Absolutely love shopping at Shoplio! The customer support team went above and beyond to help me with my order. The quality of their home decor products is simply amazing.",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 5,
    date: "5 days ago",
    verified: true,
    social: "@sarahdesigns",
    likes: 47,
    helpful: 52,
    location: "New York, USA",
    purchase: "Home Decor Collection",
    tags: ["Excellent Support", "Beautiful Products", "Prompt Delivery"],
  },
  {
    id: 6,
    name: "David Chen",
    role: "Fitness Coach",
    text: "The activewear I purchased from Shoplio is both stylish and functional. The material quality is top-notch, and everything fits perfectly. My new go-to store for fitness gear!",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.7,
    date: "1 month ago",
    verified: true,
    social: "@davidfitness",
    likes: 33,
    helpful: 41,
    location: "London, UK",
    purchase: "Sports & Activewear",
    tags: ["Comfortable", "Durable", "Great Fit"],
  },
];

const Testimonials = () => {
  const [autoplay, setAutoplay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedReviews, setLikedReviews] = useState([]);
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [testimonialStats] = useState({
    total: TestimonialData.length,
    averageRating: 4.8,
    fiveStarCount: TestimonialData.filter((t) => t.rating === 5).length,
  });
  const sliderRef = useRef(null);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 fill-current" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-400 fill-current" />
        );
      } else {
        stars.push(
          <FaRegStar key={i} className="text-gray-300 dark:text-gray-600" />
        );
      }
    }
    return stars;
  };

  const handleLike = (id) => {
    setLikedReviews((prev) =>
      prev.includes(id)
        ? prev.filter((reviewId) => reviewId !== id)
        : [...prev, id]
    );
  };

  const handleHelpful = (id) => {
    setHelpfulReviews((prev) =>
      prev.includes(id)
        ? prev.filter((reviewId) => reviewId !== id)
        : [...prev, id]
    );
  };

  const handleShare = (testimonial) => {
    if (navigator.share) {
      navigator.share({
        title: `${testimonial.name}'s Review`,
        text: testimonial.text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(testimonial.text);
      alert("Review copied to clipboard!");
    }
  };

  const filteredTestimonials =
    activeFilter === "all"
      ? TestimonialData
      : activeFilter === "5star"
      ? TestimonialData.filter((t) => t.rating === 5)
      : TestimonialData.filter((t) => t.rating >= 4);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    pauseOnHover: true,
    pauseOnFocus: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    appendDots: (dots) => (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === currentSlide
            ? "bg-gradient-to-r from-blue-600 to-purple-600 w-6"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
        aria-label={`Go to testimonial ${i + 1}`}
      />
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with Stats */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 px-4 py-2 rounded-full mb-4">
            <FaStar className="text-yellow-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Trusted by Thousands
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            What Our Customers Say
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Real experiences from real customers. Read why thousands trust
            Shoplio for their shopping needs.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {testimonialStats.averageRating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 mb-2">
                {renderStars(testimonialStats.averageRating)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Average Rating
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {testimonialStats.total}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Happy Customers
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {testimonialStats.fiveStarCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                5-Star Reviews
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full transition-all ${
              activeFilter === "all"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveFilter("5star")}
            className={`px-5 py-2 rounded-full transition-all ${
              activeFilter === "5star"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            ⭐⭐⭐⭐⭐ 5 Star
          </button>
          <button
            onClick={() => setActiveFilter("4+star")}
            className={`px-5 py-2 rounded-full transition-all ${
              activeFilter === "4+star"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            4+ Stars
          </button>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoplay(!autoplay)}
              className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              {autoplay ? <FaPause /> : <FaPlay />}
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {autoplay ? "Auto-playing" : "Paused"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-9xl text-blue-100 dark:text-gray-800 opacity-30 z-0 hidden md:block">
            <FaQuoteLeft />
          </div>
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-9xl text-blue-100 dark:text-gray-800 opacity-30 z-0 hidden md:block">
            <FaQuoteRight />
          </div>

          <Slider ref={sliderRef} {...settings}>
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-3 py-6">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full overflow-hidden group">
                  {/* Quote Icon */}
                  <div className="absolute top-4 left-4 text-blue-100 dark:text-gray-700 text-5xl opacity-30">
                    <IoMdQuote />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Rating & Date */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        {renderStars(testimonial.rating)}
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {testimonial.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {testimonial.date}
                      </span>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed italic">
                      `{testimonial.text}`
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {testimonial.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.img}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                        />
                        {testimonial.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <FaCheckCircle className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.location}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Purchased: {testimonial.purchase}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(testimonial.id)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                            likedReviews.includes(testimonial.id)
                              ? "text-red-600 bg-red-50 dark:bg-red-900/20"
                              : "text-gray-600 dark:text-gray-400 hover:text-red-600"
                          }`}
                        >
                          <FaHeart
                            className={
                              likedReviews.includes(testimonial.id)
                                ? "fill-current"
                                : ""
                            }
                          />
                          <span className="text-sm">{testimonial.likes}</span>
                        </button>

                        <button
                          onClick={() => handleHelpful(testimonial.id)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                            helpfulReviews.includes(testimonial.id)
                              ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                              : "text-gray-600 dark:text-gray-400 hover:text-blue-600"
                          }`}
                        >
                          <FaThumbsUp />
                          <span className="text-sm">
                            Helpful ({testimonial.helpful})
                          </span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleShare(testimonial)}
                        className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <FaShare />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Add Your Review CTA */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Love shopping with us? Let others know about your experience!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
                Write a Review
              </button>
              <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                See All Reviews
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-medium">Verified Reviews</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="font-medium">No Fake Reviews</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">📸</div>
            <div className="font-medium">Real Photos</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">💬</div>
            <div className="font-medium">Response Guaranteed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
