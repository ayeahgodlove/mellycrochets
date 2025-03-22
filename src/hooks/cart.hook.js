import { CartService } from "../service/cart.service";

const useCart = () => {
  const loadCartCrochets = async () => {
    try {
      const response = await CartService.list();
      return response;
    } catch (error) {
      return [];
    }
  };

  const addToCart = async (crochetId, sizeId, quantity) => {
    try {
      const cartItem = await CartService.create(crochetId, sizeId, quantity);
      console.log("Crochet Added to Cart Successfully!");
      return cartItem;
    } catch (error) {
      console.error("Crochet was not added!", error);
    }
  };

  const removeCrochet = async (crochetId, sizeId) => {
    try {
      await CartService.remove(crochetId, sizeId);
      console.log("Crochet Removed from Cart Successfully!");
    } catch (error) {
      console.error("Crochet was not removed!");
    }
  };

  const clearCrochet = async () => {
    try {
      await CartService.clear();
      console.log("Cart Cleared Successfully!");
    } catch (error) {
      console.error("Cart was not removed!");
    }
  };

  return { loadCartCrochets, addToCart, removeCrochet, clearCrochet };
};

export { useCart };
