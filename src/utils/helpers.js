export const formatPrice = (price) => {
  const safePrice = Number(price || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(safePrice);
};

export const calculateDiscount = (originalPrice, currentPrice) => {
  const original = Number(originalPrice || 0);
  const current = Number(currentPrice || 0);

  if (original <= 0) return 0;

  return Math.round(((original - current) / original) * 100);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateOrderNumber = () => {
  return `SHPL${Date.now().toString().slice(-6)}`;
};

export const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
