import { useState, useEffect } from "react";
import Banner from "../../assets/website/orange-pattern.jpg";
import {
  FaEnvelope,
  FaBell,
  FaCheckCircle,
  FaGift,
  FaShieldAlt,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";
import "../Subscribe/Subscribe.css";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
};

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailCount, setEmailCount] = useState(2543);
  const [showBenefits, setShowBenefits] = useState(false);
  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    message: "",
  });

  // Animated counter effect
  useEffect(() => {
    if (isSubscribed) {
      const interval = setInterval(() => {
        setEmailCount((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSubscribed]);

  // Validate email in real-time
  useEffect(() => {
    if (!email) {
      setEmailValidation({ isValid: false, message: "" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailValidation({
        isValid: false,
        message: "Please enter a valid email address",
      });
    } else {
      setEmailValidation({ isValid: true, message: "Valid email address" });
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email) {
      setError("Email address is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In real app, you would:
      // await subscribeToNewsletter(email);

      setIsSubscribed(true);
      localStorage.setItem("subscribedEmail", email);

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 5000);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = () => {
    setIsSubscribed(false);
    setEmail("");
    localStorage.removeItem("subscribedEmail");
  };

  const benefits = [
    {
      icon: <FaGift />,
      title: "Exclusive Offers",
      description: "15% off your first order",
    },
    {
      icon: <FaBell />,
      title: "Early Access",
      description: "Be the first to know about new arrivals",
    },
    {
      icon: <IoMdRocket />,
      title: "Flash Sales",
      description: "Limited-time deals notification",
    },
    {
      icon: <FaShieldAlt />,
      title: "No Spam",
      description: "Only quality content, unsubscribe anytime",
    },
  ];

  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0" style={BannerImg}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-orange-500/80 to-orange-600/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-transparent"></div>
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          {isSubscribed ? (
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <FaCheckCircle className="text-5xl text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to the Shoplio Family! 🎉
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Thank you for subscribing! We have sent a confirmation email
                  to
                  <span className="font-semibold text-orange-600">
                    {" "}
                    {email}
                  </span>
                  . Check your inbox for your exclusive welcome offer!
                </p>

                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-4 py-2 rounded-full mb-6">
                  <FaGift className="text-green-600" />
                  <span className="text-green-800 dark:text-green-400 font-medium">
                    Welcome Offer: 15% OFF your first order
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    Coupon code:{" "}
                    <span className="font-mono font-bold text-orange-600">
                      WELCOME15
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                    This window will close automatically in 5 seconds...
                  </p>
                </div>

                <button
                  onClick={handleUnsubscribe}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto"
                >
                  <FaTimes />
                  Unsubscribe
                </button>
              </div>
            </div>
          ) : (
            /* Main Subscription Form */
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Benefits */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 p-8 md:p-12">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 bg-white/30 dark:bg-gray-700/30 px-4 py-2 rounded-full mb-4">
                      <FaBell className="text-orange-500" />
                      <span className="text-sm font-medium text-orange-700 dark:text-orange-400">
                        Join 10,000+ Subscribers
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Never Miss a Deal!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Subscribe to our newsletter and be the first to know about
                      exclusive offers, new arrivals, and fashion tips. Plus,
                      get 15% off your first order!
                    </p>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white text-xl">
                          {benefit.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="border-t border-orange-200 dark:border-gray-700 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {emailCount.toLocaleString()}+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Subscribers
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          24h
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Response Time
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-8 md:p-12">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                        <FaEnvelope className="text-2xl text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Subscribe Now
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Get updates delivered to your inbox
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Enter your email below to join our community of
                      fashion-forward shoppers. We respect your privacy and will
                      never spam you.
                    </p>
                  </div>

                  {/* Subscription Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          placeholder="your.email@example.com"
                          className={`w-full pl-12 pr-10 py-4 rounded-xl border ${
                            error
                              ? "border-red-500"
                              : emailValidation.isValid
                              ? "border-green-500"
                              : "border-gray-300 dark:border-gray-600"
                          } dark:bg-gray-800 focus:outline-none focus:ring-2 ${
                            error
                              ? "focus:ring-red-500"
                              : emailValidation.isValid
                              ? "focus:ring-green-500"
                              : "focus:ring-orange-500"
                          } transition-all duration-300`}
                          aria-describedby={
                            error ? "email-error" : "email-help"
                          }
                        />

                        {email && (
                          <button
                            type="button"
                            onClick={() => {
                              setEmail("");
                              setError("");
                            }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>

                      {/* Validation/Error Messages */}
                      {error && (
                        <p
                          id="email-error"
                          className="mt-2 text-sm text-red-600 flex items-center gap-2 animate-shake"
                        >
                          <FaTimes className="text-red-500" />
                          {error}
                        </p>
                      )}

                      {emailValidation.message && !error && (
                        <p
                          className={`mt-2 text-sm flex items-center gap-2 ${
                            emailValidation.isValid
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {emailValidation.isValid ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaTimes className="text-yellow-500" />
                          )}
                          {emailValidation.message}
                        </p>
                      )}
                    </div>

                    {/* Privacy Policy */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        required
                        className="mt-1 text-orange-600 rounded focus:ring-orange-500"
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        I agree to receive emails about exclusive offers, new
                        arrivals, and fashion tips. I can unsubscribe at any
                        time. Read our{" "}
                        <a
                          href="/privacy"
                          className="text-orange-600 hover:underline font-medium"
                        >
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe Now
                          <FaArrowRight className="transform transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    {/* Additional Info */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        🔒 We use secure encryption. Your information is
                        protected.
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Already subscribed?{" "}
                        <button
                          type="button"
                          onClick={() => setShowBenefits(!showBenefits)}
                          className="text-orange-600 hover:underline font-medium"
                        >
                          View benefits
                        </button>
                      </p>
                    </div>
                  </form>

                  {/* Social Proof */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      Trusted by fashion enthusiasts worldwide. Join our
                      community today!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Modal */}
          {showBenefits && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
              <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Subscription Benefits</h3>
                  <button
                    onClick={() => setShowBenefits(false)}
                    className="text-2xl hover:text-red-500 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-gray-800 rounded-xl">
                    <FaGift className="text-orange-500 text-xl" />
                    <div>
                      <h4 className="font-semibold">Welcome Gift</h4>
                      <p className="text-sm text-gray-600">
                        15% off your first order
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-gray-800 rounded-xl">
                    <FaBell className="text-orange-500 text-xl" />
                    <div>
                      <h4 className="font-semibold">Early Access</h4>
                      <p className="text-sm text-gray-600">
                        Shop sales 24 hours early
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-gray-800 rounded-xl">
                    <FaShieldAlt className="text-orange-500 text-xl" />
                    <div>
                      <h4 className="font-semibold">No Spam, Ever</h4>
                      <p className="text-sm text-gray-600">
                        Unsubscribe anytime with one click
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowBenefits(false)}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Prop validation
Subscribe.propTypes = {
  // Add any props if needed in the future
};

export default Subscribe;
