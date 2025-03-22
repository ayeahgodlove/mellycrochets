import { nanoid } from "nanoid";
import { emptyCartItem } from "../models";

class CartItemRequestDto {
  constructor(data) {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid cart item data");
    }
    const { crochetId, userId, sizeId, quantity, price } = data;
    if (!crochetId || typeof crochetId !== "string") {
      throw new Error("Valid crochetId is required.");
    }

    if (!userId || typeof userId !== "string") {
      throw new Error("Valid userId is required.");
    }

    if (!sizeId || typeof sizeId !== "string") {
      throw new Error("Valid sizeId is required.");
    }
    if (typeof quantity !== "number" || quantity <= 0) {
      throw new Error("Valid quantity is required.");
    }

    if (typeof price !== "number" || price < 0) {
      throw new Error("Valid discounted price is required.");
    }

    this.crochetId = data.crochetId;
    this.userId = data.userId;
    this.sizeId = data.sizeId;
    this.quantity = data.quantity;
    this.price = data.price;
  }

  toData() {
    return {
      ...emptyCartItem,
      id: nanoid(20),
      crochetId: this.crochetId,
      userId: this.userId,
      sizeId: this.sizeId,
      quantity: this.quantity,
      price: this.price,
      total: this.price * this.quantity,
    };
  }

  toUpdateData(data) {
    if (!data.id || typeof data.id !== "string") {
      throw new Error("Valid ID is required for update.");
    }

    return {
      ...data,
    };
  }
}

export { CartItemRequestDto };
