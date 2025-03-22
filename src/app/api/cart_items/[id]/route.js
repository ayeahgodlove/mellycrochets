import { CartItemRequestDto } from "../../../../data/dtos/cart-item-request.dto";
// import { CartItemMapper } from "../../../../data/presentation/mappers/mapper";
import { CartItemRepository } from "../../../../data/repositories/cart-item.repository";
import { displayValidationErrors } from "../../../../lib/displayValidationErrors";
import { validate } from "class-validator";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../../../lib/options";
import { emptyCartItem } from "../../../../data/models";
import { initializeSocket } from "../../../../lib/socket";

const cartItemRepository = new CartItemRepository();
// const cartItemMapper = new CartItemMapper();

export async function PATCH(req, { params }) {
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

  if (!params?.id) {
    return NextResponse.json(
      {
        message: "Invalid request: ID is required.",
        success: false,
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    const dto = new CartItemRequestDto(await req.json());
    const validationErrors = await validate(dto);

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

    const id = params.id;

    const obj = {
      ...emptyCartItem,
      ...dto.toData(),
      id: id,
    };
    const updatedCartItem = await cartItemRepository.update(obj);

    return NextResponse.json(
      {
        data: updatedCartItem,
        message: "CartItem Updated Successfully!",
        validationErrors: [],
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const io = initializeSocket(req);
  if (!params?.id) {
    return NextResponse.json(
      { message: "ID is required", success: false, data: null },
      { status: 400 }
    );
  }

  try {
    const itemId = params.id;

    const cartItem = await cartItemRepository.findById(itemId);
    io.emit("cart-updated", itemId);
    return NextResponse.json(cartItem);
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

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions); //get session info
  const io = initializeSocket(req);

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
    const id = params.id;

    await cartItemRepository.delete(id);
    io.emit("cart-cleared");
    return NextResponse.json({
      message: `Operation successfully completed!`,
      validationErrors: [],
      success: true,
      data: null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        data: null,
        validationErrors: [error],
        success: false,
      },
      { status: 400 }
    );
  }
}
