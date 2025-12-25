import { useState } from "react";
import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/website/footer-pattern.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaRegEnvelope,
  FaArrowUp,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
} from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
};

const FooterLinks = [
  {
    title: "Shop",
    links: [
      { name: "New Arrivals", link: "/new" },
      { name: "Winter Collection", link: "/winter" },
      { name: "Summer Collection", link: "/summer" },
      { name: "Sale", link: "/sale" },
      { name: "Best Sellers", link: "/bestsellers" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", link: "/about" },
      { name: "Careers", link: "/careers" },
      { name: "Blog", link: "/blog" },
      { name: "Press", link: "/press" },
      { name: "Sustainability", link: "/sustainability" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", link: "/contact" },
      { name: "FAQ", link: "/faq" },
      { name: "Shipping & Delivery", link: "/shipping" },
      { name: "Returns & Exchanges", link: "/returns" },
      { name: "Size Guide", link: "/size-guide" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", link: "/privacy" },
      { name: "Terms of Service", link: "/terms" },
      { name: "Cookie Policy", link: "/cookies" },
      { name: "Accessibility", link: "/accessibility" },
    ],
  },
];

const paymentMethods = [
  { name: "Visa", icon: "💳" },
  { name: "MasterCard", icon: "💳" },
  { name: "PayPal", icon: "💰" },
  { name: "Apple Pay", icon: "🍎" },
  { name: "Google Pay", icon: "G" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Check scroll position for back-to-top button
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowBackToTop(window.scrollY > 500);
    });
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed:", email);
      setIsSubscribed(true);
      setEmail("");
      // Reset subscription message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: <FaFacebook />,
      link: "https://www.facebook.com/m.h.milon.212672",
      color: "hover:text-blue-600",
    },
    {
      icon: <FaInstagram />,
      link: "https://www.instagram.com/mahamudulhasan_milon/",
      color: "hover:text-pink-600",
    },
    {
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/md-mahamudul-hasan-milon-91aa81230/",
      color: "hover:text-blue-700",
    },
    { icon: <FaTwitter />, link: "#", color: "hover:text-blue-400" },
    { icon: <FaYoutube />, link: "#", color: "hover:text-red-600" },
    { icon: <FaTiktok />, link: "#", color: "hover:text-black" },
    { icon: <FaPinterest />, link: "#", color: "hover:text-red-700" },
  ];

  return (
    <footer style={BannerImg} className="relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-bounce"
        >
          <FaArrowUp />
        </button>
      )}

      <div className="container relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={footerLogo}
                    alt="Shoplio Logo"
                    className="w-12 h-12"
                  />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Shoplio
                  </h1>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Shoplio brings you trusted products, affordable prices and
                  smooth shopping—anytime, anywhere with confidence. Experience
                  fashion that fits your lifestyle.
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaShieldAlt className="text-green-400" />
                    <span>Secure Shopping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaTruck className="text-blue-400" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaCreditCard className="text-purple-400" />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            {FooterLinks.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.link}
                        className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                      >
                        <span className="w-2 h-2 bg-transparent group-hover:bg-blue-400 rounded-full mr-3 transition-all duration-300"></span>
                        {link.name}
                        <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-3 transition-all duration-300">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-3 mb-3">
                    <FaRegEnvelope className="text-2xl text-blue-400" />
                    <h3 className="text-xl font-bold text-white">
                      Stay Updated
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    Subscribe to our newsletter and get 15% off your first
                    order! Be the first to know about new arrivals, exclusive
                    offers, and style tips.
                  </p>
                </div>

                <div className="lg:w-1/2 w-full">
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-6 py-4 bg-gray-900/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
                        required
                      />
                      {isSubscribed && (
                        <div className="absolute -top-12 left-0 bg-green-500 text-white px-4 py-2 rounded-lg animate-fade-in">
                          ✅ Thank you for subscribing!
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
                    >
                      <span>Subscribe</span>
                      <IoIosSend className="text-lg" />
                    </button>
                  </form>
                  <p className="text-xs text-gray-400 mt-3">
                    By subscribing, you agree to our Privacy Policy and consent
                    to receive updates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Social Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-900/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <FaMobileAlt className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Call us 24/7</p>
                    <p className="text-white font-medium">+880 1773 593797</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-900/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <FaLocationArrow className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Our Location</p>
                    <p className="text-white font-medium">
                      Mirpur, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">
                Follow Us
              </h3>
              <p className="text-gray-300 mb-4">
                Join our community for style inspiration and exclusive deals
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-900/50 rounded-xl flex items-center justify-center text-xl text-gray-300 ${social.color} transform transition-all duration-300 hover:scale-110 hover:bg-gray-800`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">
                Secure Payment
              </h3>
              <div className="flex flex-wrap gap-3 mb-4">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-gray-900/30 rounded-lg flex items-center gap-2"
                  >
                    <span>{method.icon}</span>
                    <span className="text-sm text-gray-300">{method.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400">
                256-bit SSL encryption. Your payment information is secure with
                us.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700/50 my-8"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Shoplio. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Designed with{" "}
                <FaHeart className="inline text-red-500 animate-pulse" /> in
                Bangladesh
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Settings
              </a>
              <a
                href="/sitemap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sitemap
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">
                <span className="text-white">24/7</span> Customer Support
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App Banner (Optional) */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold mb-1">
                Get the Shoplio App
              </h4>
              <p className="text-gray-400 text-sm">
                Enjoy exclusive app-only deals
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                App Store
              </button>
              <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
