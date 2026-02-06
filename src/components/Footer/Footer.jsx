import { useCallback, useEffect, useRef, useState } from "react";

import footerLogo from "../../assets/logo.png";
import FooterPattern from "../../assets/website/footer-pattern.jpg";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaRegEnvelope,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
} from "react-icons/fa";

import { IoIosSend } from "react-icons/io";

const bannerStyle = {
  backgroundImage: `url(${FooterPattern})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
};

const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { name: "New Arrivals", href: "/new" },
      { name: "Winter Collection", href: "/winter" },
      { name: "Summer Collection", href: "/summer" },
      { name: "Sale", href: "/sale" },
      { name: "Best Sellers", href: "/bestsellers" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
      { name: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Shipping & Delivery", href: "/shipping" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "Size Guide", href: "/size-guide" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/m.h.milon.212672",
    Icon: FaFacebook,
    hoverClass: "hover:text-blue-500",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mahamudulhasan_milon/",
    Icon: FaInstagram,
    hoverClass: "hover:text-pink-500",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/md-mahamudul-hasan-milon-91aa81230/",
    Icon: FaLinkedin,
    hoverClass: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    href: "#",
    Icon: FaTwitter,
    hoverClass: "hover:text-sky-400",
  },
  {
    name: "YouTube",
    href: "#",
    Icon: FaYoutube,
    hoverClass: "hover:text-red-500",
  },
  {
    name: "TikTok",
    href: "#",
    Icon: FaTiktok,
    hoverClass: "hover:text-white",
  },
];

const PAYMENT_METHODS = [
  { name: "Visa", icon: "💳" },
  { name: "MasterCard", icon: "💳" },
  { name: "PayPal", icon: "💰" },
  { name: "Apple Pay", icon: "🍎" },
  { name: "Google Pay", icon: "G" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubscribe = useCallback(
    (e) => {
      e.preventDefault();

      const value = email.trim();
      if (!value) return;

      setIsSubscribed(true);
      setEmail("");

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    },
    [email],
  );

  return (
    <footer style={bannerStyle} className="relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="py-12 lg:py-16">
          {/* Top */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={footerLogo}
                  alt="Shoplio Logo"
                  className="w-12 h-12"
                />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Shoplio
                </h2>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Shoplio brings you trusted products, affordable prices and
                smooth shopping—anytime, anywhere with confidence. Experience
                fashion that fits your lifestyle.
              </p>

              <div className="flex flex-wrap gap-4">
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

            {/* Links */}
            {FOOTER_LINKS.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.links.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-all duration-200 flex items-center group"
                      >
                        <span className="w-2 h-2 bg-transparent group-hover:bg-blue-400 rounded-full mr-3 transition-all duration-200" />
                        {item.name}
                        <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-3 transition-all duration-200">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mb-12">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
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
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-6 py-4 bg-black/30 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
                        required
                      />

                      {isSubscribed && (
                        <div className="absolute -top-12 left-0 bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
                          ✅ Thank you for subscribing!
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20"
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

          {/* Contact + Social + Payment */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Contact Us
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-11 h-11 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <FaMobileAlt className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Call us 24/7</p>
                    <p className="text-white font-medium">+880 1773 593797</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-11 h-11 bg-purple-500/20 rounded-full flex items-center justify-center">
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

            {/* Social */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Follow Us
              </h3>

              <p className="text-gray-300 mb-4">
                Join our community for style inspiration and exclusive deals
              </p>

              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map(({ name, href, Icon, hoverClass }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={`w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl text-gray-300 ${hoverClass} transition-all duration-200 hover:scale-110 hover:bg-white/10`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Secure Payment
              </h3>

              <div className="flex flex-wrap gap-3 mb-4">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.name}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2"
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
          <div className="border-t border-white/10 my-8" />

          {/* Bottom */}
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
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">
                <span className="text-white">24/7</span> Customer Support
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ FIXED Mobile App Banner */}
      <div className="relative z-10 border-t border-white/10 bg-gradient-to-r from-black via-gray-950 to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-white text-lg font-semibold mb-1">
                Get the Shoplio App
              </h4>
              <p className="text-gray-400 text-sm">
                Enjoy exclusive app-only deals and faster checkout.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                  hover:bg-white/10 transition-colors"
              >
                🍎 App Store
              </button>

              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white
                  hover:bg-white/10 transition-colors"
              >
                ▶ Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
