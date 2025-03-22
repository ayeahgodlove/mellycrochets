import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { CartItemRequestDto } from "../../../data/dtos/cart-item-request.dto";
import { displayValidationErrors } from "../../../lib/displayValidationErrors";
import authOptions from "../../../lib/options";
import { getServerSession } from "next-auth";
import { initializeSocket, getSocketInstance } from "../../../lib/socket";
import { CrochetSize } from "../../../data/entities";
import { addToCart, getCartItems } from "../../../data/usecases/cart.usecase";

export async function GET(request) {
  const session = await getServerSession(authOptions); //get session info
  const io = initializeSocket(request);

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

    io.emit("cart-items", cartItems);
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
  const io = getSocketInstance();

  if (!io) {
    console.log("❌ Socket.io is not initialized yet!");
    return NextResponse.json(
      { message: "Socket.io not ready" },
      { status: 500 }
    );
  }

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

    let crochet = await CrochetSize.findOne({
      where: { crochetId: body.crochetId, sizeId: body.sizeId },
    });

    if (!crochet) {
      console.log("Crochet not found:", { crochetId, sizeId });
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
      price: Number(crochet.price),
    });
    const validationErrors = await validate(dto);

    //desstructure the object
    const { crochetId, sizeId, quantity, userId, price, total } = dto.toData();

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

    await addToCart(userId, crochetId, sizeId, quantity, price, crochet);
    const cartItems = await getCartItems(userId);
    // const mappedCartItems = cartItems.map((item) => item.get());
    io.emit("cart-updated", cartItems); // Emit event
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
