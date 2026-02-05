import {
  useEffect,
  useMemo,
  useState,
  Suspense,
  lazy,
  useCallback,
} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import ErrorBoundary from "./components/Common/ErrorBoundary";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Hero = lazy(() => import("./components/Hero/Hero"));
const Products = lazy(() => import("./components/Products/Products"));
const TopProducts = lazy(() => import("./components/TopProducts/TopProducts"));
const Banner = lazy(() => import("./components/Banner/Banner"));
const Subscribe = lazy(() => import("./components/Subscribe/Subscribe"));
const Testimonials = lazy(
  () => import("./components/Testimonials/Testimonials"),
);
const Footer = lazy(() => import("./components/Footer/Footer"));
const Popup = lazy(() => import("./components/Popup/Popup"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [orderPopup, setOrderPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      once: true,
    });
  }, []);

  const openOrderPopup = useCallback((productId = null) => {
    setSelectedProductId(productId);
    setOrderPopup(true);
  }, []);

  const closeOrderPopup = useCallback(() => {
    setOrderPopup(false);
    setSelectedProductId(null);
  }, []);

  const appClassName = useMemo(() => {
    return "min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300";
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <ErrorBoundary>
          <div className={appClassName}>
            <Suspense fallback={<LoadingSpinner />}>
              <Navbar onOrderClick={openOrderPopup} />
              <Hero onOrderClick={openOrderPopup} />
              <Products onOrderClick={openOrderPopup} />
              <TopProducts onOrderClick={openOrderPopup} />
              <Banner />
              <Subscribe />
              <Testimonials />
              <Footer />

              <Popup
                isOpen={orderPopup}
                onClose={closeOrderPopup}
                selectedProductId={selectedProductId}
              />
            </Suspense>
          </div>
        </ErrorBoundary>
      </CartProvider>
    </ThemeProvider>
  );
}
