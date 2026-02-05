import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const CartContext = createContext(null);

const CART_ACTIONS = Object.freeze({
  SET_CART: "SET_CART",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
});

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.SET_CART: {
      return { ...state, items: action.payload ?? [] };
    }

    case CART_ACTIONS.ADD_TO_CART: {
      const product = action.payload;
      const id = product?.id;
      const quantity = Math.max(1, Number(product?.quantity ?? 1));

      if (!id) return state;

      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...product, quantity }],
      };
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const id = action.payload;
      return { ...state, items: state.items.filter((item) => item.id !== id) };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload ?? {};
      const q = Number(quantity);

      if (!id || Number.isNaN(q)) return state;

      if (q <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: q } : item,
        ),
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [storedCart, setStoredCart] = useLocalStorage("cart", []);

  // reducer initial state ONLY ON FIRST RENDER
  const [state, dispatch] = useReducer(cartReducer, {
    items: storedCart ?? [],
  });

  // ✅ Persist to localStorage when items change
  useEffect(() => {
    setStoredCart(state.items);
  }, [state.items, setStoredCart]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id) return;

    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: {
        ...product,
        quantity: Math.max(1, Number(quantity || 1)),
      },
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: productId });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity },
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  }, []);

  const cartTotal = useMemo(() => {
    return state.items.reduce((sum, item) => {
      return sum + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);
  }, [state.items]);

  const cartCount = useMemo(() => {
    return state.items.reduce((sum, item) => {
      return sum + Number(item.quantity || 0);
    }, 0);
  }, [state.items]);

  const value = useMemo(() => {
    return {
      items: state.items,

      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,

      cartTotal,
      cartCount,
      isEmpty: state.items.length === 0,
    };
  }, [
    state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
