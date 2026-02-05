import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

import { IoCloseOutline, IoCheckmarkCircle } from "react-icons/io5";
import {
  FaShoppingCart,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCreditCard,
  FaTruck,
  FaBox,
} from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import "./Popup.css";

// ✅ Better: move to constants file
const PRODUCTS = [
  {
    id: 1,
    name: "Winter Jacket",
    price: 49.99,
    color: "Black",
    size: "M",
    category: "Men's Wear",
  },
  {
    id: 2,
    name: "Cashmere Sweater",
    price: 79.99,
    color: "Navy",
    size: "L",
    category: "Women's Wear",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    color: "Space Gray",
    size: "One Size",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 89.99,
    color: "White/Blue",
    size: "42",
    category: "Footwear",
  },
];

const INITIAL_FORM = Object.freeze({
  name: "",
  email: "",
  address: "",
  phone: "",
  paymentMethod: "credit_card",
  quantity: 1,
  notes: "",
  agreeToTerms: false,
});

const PAYMENT_METHODS = ["credit_card", "paypal", "apple_pay", "google_pay"];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPaymentDescription(method) {
  switch (method) {
    case "credit_card":
      return "Pay with your credit or debit card";
    case "paypal":
      return "Fast and secure payment with PayPal";
    case "apple_pay":
      return "Pay quickly with Apple Pay";
    case "google_pay":
      return "Pay securely with Google Pay";
    default:
      return "";
  }
}

function getPaymentIcon(method) {
  if (method === "credit_card") return <FaCreditCard className="text-xl" />;
  return null;
}

export default function Popup({ isOpen, onClose, selectedProductId }) {
  const timeoutsRef = useRef([]);
  const orderNumberRef = useRef(`SHPL${Date.now().toString().slice(-6)}`);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Cleanup all timeouts
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  // ✅ Set selected product
  useEffect(() => {
    if (!selectedProductId) return;

    const product = PRODUCTS.find((p) => p.id === selectedProductId);
    if (!product) return;

    setSelectedProduct(product);
    setFormData((prev) => ({ ...prev, quantity: 1 }));
  }, [selectedProductId]);

  // ✅ Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const total = useMemo(() => {
    const subtotal =
      Number(selectedProduct.price || 0) * Number(formData.quantity || 1);

    const shipping = subtotal > 100 ? 0 : 4.99;
    const tax = subtotal * 0.08;

    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + shipping + tax).toFixed(2),
    };
  }, [selectedProduct.price, formData.quantity]);

  const progressWidth = useMemo(() => {
    // step 1 = 0%, step 4 = 100%
    return `${((step - 1) / 3) * 100}%`;
  }, [step]);

  const shippingShort = useMemo(() => {
    const addr = formData.address?.trim();
    if (!addr) return "Your address";
    return addr.split(",")[0];
  }, [formData.address]);

  const resetPopup = useCallback(() => {
    setStep(1);
    setIsSubmitting(false);
    setErrors({});
    setFormData(INITIAL_FORM);
  }, []);

  const handleClose = useCallback(() => {
    onClose?.();

    const t = setTimeout(() => resetPopup(), 300);
    timeoutsRef.current.push(t);
  }, [onClose, resetPopup]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // ✅ Clear error safely (no stale dependency)
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  }, []);

  const validateStep2 = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const nextStep = useCallback(() => {
    if (step === 2 && !validateStep2()) return;
    if (step < 4) setStep((prev) => prev + 1);
  }, [step, validateStep2]);

  const prevStep = useCallback(() => {
    if (step > 1) setStep((prev) => prev - 1);
  }, [step]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      setIsSubmitting(true);

      const t1 = setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);

        const t2 = setTimeout(() => {
          handleClose();
        }, 5000);

        timeoutsRef.current.push(t2);
      }, 1500);

      timeoutsRef.current.push(t1);
    },
    [handleClose],
  );

  const decreaseQuantity = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, Number(prev.quantity || 1) - 1),
    }));
  }, []);

  const increaseQuantity = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      quantity: Number(prev.quantity || 1) + 1,
    }));
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out scale-100 opacity-100">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaShoppingCart className="text-white text-lg" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {step === 1 && "Your Cart"}
                      {step === 2 && "Shipping Details"}
                      {step === 3 && "Payment Method"}
                      {step === 4 && "Order Confirmed!"}
                    </h2>
                    <p className="text-blue-100 text-sm">Step {step} of 4</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors duration-200"
                  aria-label="Close"
                >
                  <IoCloseOutline className="text-xl" />
                </button>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step >= s
                          ? "bg-white text-blue-600"
                          : "bg-white/30 text-white"
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>

                <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-500 ease-out"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-700 rounded-xl flex items-center justify-center">
                        <FiPackage className="text-4xl text-blue-500" />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {selectedProduct.name}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              {selectedProduct.category} •{" "}
                              {selectedProduct.color} • Size{" "}
                              {selectedProduct.size}
                            </p>
                          </div>

                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            ${selectedProduct.price}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={decreaseQuantity}
                              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                              -
                            </button>

                            <span className="w-12 text-center font-medium">
                              {formData.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={increaseQuantity}
                              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Subtotal
                            </p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                              $
                              {(
                                selectedProduct.price * formData.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                      Order Summary
                    </h4>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Subtotal
                        </span>
                        <span className="font-medium">${total.subtotal}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Shipping
                        </span>
                        <span className="font-medium">
                          {Number(total.shipping) === 0
                            ? "FREE"
                            : `$${total.shipping}`}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Tax
                        </span>
                        <span className="font-medium">${total.tax}</span>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-blue-600 dark:text-blue-400">
                            ${total.total}
                          </span>
                        </div>

                        {Number(total.subtotal) > 100 && (
                          <div className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                            <IoCheckmarkCircle />
                            You saved $4.99 on shipping!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaUser className="inline mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.name
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <HiOutlineExclamationCircle />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaPhone className="inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.phone
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <HiOutlineExclamationCircle />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <HiOutlineExclamationCircle />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaMapMarkerAlt className="inline mr-2" />
                      Shipping Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.address
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="123 Main St, Apt 4B, New York, NY 10001"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <HiOutlineExclamationCircle />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Delivery instructions, gift wrapping, etc."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1"
                      id="terms"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      I agree to the terms and conditions and privacy policy.
                    </label>
                  </div>

                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <HiOutlineExclamationCircle />
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                      Select Payment Method
                    </h4>

                    <div className="space-y-3">
                      {PAYMENT_METHODS.map((method) => (
                        <label
                          key={method}
                          className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all ${
                            formData.paymentMethod === method
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                          />

                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              {getPaymentIcon(method)}
                              <span className="font-medium capitalize">
                                {method.replace("_", " ")}
                              </span>
                            </div>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {getPaymentDescription(method)}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCreditCard />
                        Place Order • ${total.total}
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <IoCheckmarkCircle className="text-5xl text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Order Confirmed! 🎉
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Thank you for your order! We have sent a confirmation email
                    to <span className="font-semibold">{formData.email}</span>.
                    Your order will be shipped within 1-2 business days.
                  </p>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-5 max-w-md mx-auto mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FaBox className="text-xl text-green-600" />
                        <div>
                          <p className="font-bold">
                            Order #{orderNumberRef.current}
                          </p>
                          <p className="text-sm text-gray-500">
                            Placed just now
                          </p>
                        </div>
                      </div>

                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Processing
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FaTruck className="text-blue-500" />
                        <div>
                          <p className="font-medium">Estimated Delivery</p>
                          <p className="text-sm text-gray-500">
                            {new Date(
                              Date.now() + 3 * 24 * 60 * 60 * 1000,
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-purple-500" />
                        <div>
                          <p className="font-medium">Shipping to</p>
                          <p className="text-sm text-gray-500">
                            {shippingShort}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 animate-pulse">
                    This window will close automatically in 5 seconds...
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4">
              <div className="flex justify-between items-center">
                {step > 1 && step < 4 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                )}

                {step < 3 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    {step === 1 ? "Continue to Shipping" : "Proceed to Payment"}
                  </button>
                )}

                {step === 1 && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Continue Shopping
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedProductId: PropTypes.number,
};

Popup.defaultProps = {
  selectedProductId: null,
};
