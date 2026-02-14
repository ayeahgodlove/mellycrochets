import { CartItemRequestDto } from "../../../../data/dtos/cart-item-request.dto";
import { CartItemRepository } from "../../../../data/repositories/cart-item.repository";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../../lib/displayValidationErrors";
import { validate } from "class-validator";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../../../lib/options";
import { emptyCartItem } from "../../../../data/models";

const cartItemRepository = new CartItemRepository();

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

  const resolved = await params;
  if (!resolved?.id) {
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
    const validationErrors = await validate(dto, VALIDATION_OPTIONS);

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

    const id = resolved.id;

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
  const resolved = await params;
  if (!resolved?.id) {
    return NextResponse.json(
      { message: "ID is required", success: false, data: null },
      { status: 400 }
    );
  }

  try {
    const itemId = resolved.id;

    const cartItem = await cartItemRepository.findById(itemId);
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

  const resolved = await params;
  if (!resolved?.id) {
    return NextResponse.json(
      { message: "ID is required", success: false, data: null },
      { status: 400 }
    );
  }

  try {
    const id = resolved.id;
    const userId = session.user.id;

    await cartItemRepository.delete(id, userId);
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
