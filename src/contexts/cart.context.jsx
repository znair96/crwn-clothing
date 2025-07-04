import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    //readability of code is more here as compared to the commented code
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    // return cartItems.map((cartItem) => ({
    //   ...cartItem,
    //   quantity:
    //     cartItem.name === productToAdd.name
    //       ? cartItem.quantity + 1
    //       : cartItem.quantity,
    // }));
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  removeItemsToCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

function cartReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, cartCount, cartTotal, isCartOpen } = state;
  const updateCartReducer = (cartItems) => {
    const cartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const cartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    const payload = {
      cartItems,
      cartCount,
      cartTotal,
    };
    dispatch(createAction(CART_ACTION.SET_CART_ITEMS, payload));
  };
  const addItemsToCart = (productToAdd) => {
    const updatedCartItems = addCartItem(cartItems, productToAdd);
    updateCartReducer(updatedCartItems);
  };
  const removeItemsToCart = (cartItemToRemove) => {
    const updatedCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartReducer(updatedCartItems);
  };
  const clearItemFromCart = (cartItemToClear) => {
    const updatedCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartReducer(updatedCartItems);
  };
  const setIsCartOpen = () => {
    dispatch(createAction(CART_ACTION.SET_IS_CART_OPEN, !isCartOpen));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemsToCart,
    removeItemsToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
