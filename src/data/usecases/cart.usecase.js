import { nanoid } from "nanoid";
import { CartItem, Crochet, Size } from "../entities";

export function calculateTotal(price, quantity) {
  return price * quantity;
}

export async function addToCart(
  userId,
  crochetId,
  sizeId,
  quantity,
  price,
  crochet
) {
  let cartItem = await CartItem.findOne({
    where: { userId, crochetId, sizeId },
  });

  if (cartItem) {
    // If exists, update quantity
    cartItem.quantity += quantity;

    const total = calculateTotal(crochet.price, cartItem.quantity);
    cartItem.price = price;
    cartItem.total = total;

    await cartItem.save();
  } else {
    const total = calculateTotal(crochet.price, quantity);

    // If not exists, create new cart item
    cartItem = await CartItem.create({
      id: nanoid(10),
      userId,
      crochetId,
      sizeId,
      quantity,
      price,
      total,
    });
  }
  return cartItem.toJSON();
}

export async function getCartItems(userId) {
  const cartItems = await CartItem.findAll({
    where: { userId },
    include: [{ model: Crochet, as: "crochet" }],
  });

  const formattedCrochets = cartItems.map((cartItem) => ({
    ...cartItem.get(),
    crochet: {
      ...cartItem.crochet.get(),
      imageUrls: JSON.parse(cartItem.crochet.imageUrls),
    },
  }));
  return formattedCrochets;
}
