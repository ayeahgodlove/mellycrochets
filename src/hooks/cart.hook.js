import { useSession } from "next-auth/react";
import { CartService } from "../service/cart.service";
import { CART_KEY } from "../constants/constant";
import { CrochetsService } from "../service/crochet.service";
import { useCurrency } from "./currency.hook";

const useCart = () => {
  const { data, status } = useSession();
  const { getPrice } = useCurrency();

  const loadCartCrochets = async () => {
    try {
      if (status === "authenticated" || data) {
        const response = await CartService.list();
        return response;
      } else {
        const guestCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        const crochetIds = guestCart.map((item) => item.crochetId);
        const crochets = await CrochetsService.filterByIds(crochetIds);
        const updatedCart = guestCart.map((item) => {
          const crochet = crochets.find(
            (crochet) => crochet.id === item.crochetId
          );
          const price = getPrice(crochet.priceInCfa, crochet.priceInUsd);
          return {
            ...item,
            crochet,
            total: item.quantity * price,
            price: Number(price),
          };
        });
        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
        return updatedCart;
      }
    } catch (error) {
      return [];
    }
  };

  const addToCart = async (crochetId, sizeId, quantity, currency, color) => {
    const item = {
      crochetId,
      sizeId,
      quantity,
      currency,
      color,
      timestamp: Date.now(),
    };
    try {
      if (status === "authenticated" || data) {
        const cartItem = await CartService.create(
          crochetId,
          sizeId,
          quantity,
          currency,
          color
        );
        return cartItem;
      } else {
        const existingCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

        // Check if item with same crochetId and sizeId already exists
        const existingItemIndex = existingCart.findIndex(
          (cartItem) =>
            cartItem.crochetId === crochetId && cartItem.sizeId === sizeId
        );
        if (existingItemIndex !== -1) {
          // Update quantity if item already exists
          existingCart[existingItemIndex].quantity += quantity;
          existingCart[existingItemIndex].timestamp = Date.now();
        } else {
          // Add new item if it doesn't exist
          existingCart.push(item);
        }
        localStorage.setItem(CART_KEY, JSON.stringify(existingCart));
        return existingCart;
      }
    } catch (error) {
      console.error("Crochet was not added!", error);
    }
  };

  const removeItemFromGuestCart = (crochetId) => {
    const guestCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const updatedCart = guestCart.filter(
      (item) => item.crochetId !== crochetId
    );
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  };

  const removeCrochet = async (crochetId) => {
    try {
      if (status === "authenticated" || data) {
        const response = await CartService.remove(crochetId);
        const { success } = response.data;
        return success ?? false;
      } else {
        removeItemFromGuestCart(crochetId);
        return true;
      }
    } catch (error) {
      console.error("Crochet was not removed!", error);
      return false;
    }
  };

  const updateQuantity = async (cartItemId, newQuantity, crochetId, sizeId, currency, color) => {
    try {
      if (status === "authenticated" || data) {
        // For authenticated users, update via API
        const response = await CartService.update(cartItemId, {
          crochetId,
          sizeId,
          quantity: newQuantity,
          currency,
          color,
        });
        return response?.data || response;
      } else {
        // For guest users, update localStorage
        const guestCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        const itemIndex = guestCart.findIndex(
          (item) => item.crochetId === crochetId && item.sizeId === sizeId
        );
        
        if (itemIndex !== -1) {
          if (newQuantity <= 0) {
            // Remove item if quantity is 0 or less
            guestCart.splice(itemIndex, 1);
          } else {
            // Update quantity and recalculate price
            const crochets = await CrochetsService.filterByIds([crochetId]);
            const crochet = crochets.find((c) => c.id === crochetId);
            if (crochet) {
              const price = getPrice(crochet.priceInCfa, crochet.priceInUsd);
              guestCart[itemIndex].quantity = newQuantity;
              guestCart[itemIndex].timestamp = Date.now();
              // Note: total will be recalculated when loadCartCrochets is called
            }
          }
          localStorage.setItem(CART_KEY, JSON.stringify(guestCart));
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error("Failed to update quantity!", error);
      return false;
    }
  };

  const clearCrochet = async () => {
    try {
      if (status === "authenticated" || data) {
        await CartService.clear();
      } else {
        localStorage.removeItem(CART_KEY);
      }
    } catch (error) {
      console.error("Cart was not removed!");
    }
  };

  const getCartTotal = (cartItems) => {
    const total = cartItems.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0);
    return total;
  };
  const getCartQuantity = (cartItems) => {
    const totalQtty = cartItems.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    return totalQtty;
  };
  const getCartItemCount = (cartItems) => {
    const totalCount = cartItems.reduce((prev, curr) => {
      return prev + curr.count;
    }, 0);
    return totalCount;
  };

  const migrateGuestCart = async () => {
    const guestCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

    for (const item of guestCart) {
      try {
        await CartService.create(
          item.crochetId,
          item.sizeId,
          item.quantity,
          item.currency,
          item.color
        );
      } catch (e) {
        console.error("Failed to migrate item to server:", e);
      }
    }

    // Clear guest cart after migration
    localStorage.removeItem(CART_KEY);
  };

  return {
    loadCartCrochets,
    addToCart,
    removeCrochet,
    updateQuantity,
    clearCrochet,
    getCartTotal,
    getCartQuantity,
    getCartItemCount,
    migrateGuestCart,
  };
};

export { useCart };
