import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { CartItemRequestDto } from "../../../data/dtos/cart-item-request.dto";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../lib/displayValidationErrors";
import authOptions from "../../../lib/options";
import { getServerSession } from "next-auth";
import { Crochet } from "../../../data/entities";
import { addToCart, getCartItems } from "../../../data/usecases/cart.usecase";
import { CURRENCY } from "../../../constants/constant";

export async function GET(request) {
  const session = await getServerSession(authOptions); //get session info


  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Unauthorized: Please log in to access this resource.",
        success: false,
        data: null,
        validationErrors: [],
      },
      { status: 401 }
    );
  }

  try {
    const userId = session?.user.id;
    const cartItems = await getCartItems(userId);
    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions); //get session info

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Unauthorized: Please log in to access this resource.",
        success: false,
        data: null,
        validationErrors: [],
      },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    body.userId = session.user.id;

    let crochet = await Crochet.findByPk(body.crochetId);

    if (!crochet) {
      return NextResponse.json(
        {
          validationErrors: [],
          success: false,
          data: null,
          message: "Crochet not found!",
        },
        { status: 404 }
      );
    }

    const dto = new CartItemRequestDto({
      ...body,
      price:
        body.currency === CURRENCY.cfa
          ? Number(crochet.priceInCfa)
          : Number(crochet.priceInUsd),
      selectedColors: body.color,
    });

    const validationErrors = await validate(dto, VALIDATION_OPTIONS);
    //desstructure the object
    const { crochetId, sizeId, quantity, userId, price, currency, selectedColors } =
      dto.toData();

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          validationErrors: displayValidationErrors(validationErrors),
          success: false,
          data: null,
          message: "Attention!",
        },
        { status: 400 }
      );
    }

    await addToCart(
      userId,
      crochetId,
      sizeId,
      quantity,
      price,
      currency,
      selectedColors
    );
    const cartItems = await getCartItems(userId);
    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        validationErrors: [],
        success: false,
      },
      { status: 400 }
    );
  }
}
