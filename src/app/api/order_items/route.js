import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { OrderItemRepository } from "../../../data/repositories/order-item.repository";
import { OrderItemRequestDto } from "../../../data/dtos/order-item-request.dto";
import { displayValidationErrors, VALIDATION_OPTIONS } from "../../../lib/displayValidationErrors";
import authOptions from "../../../lib/options";
import { getServerSession } from "next-auth";

const orderItemRepository = new OrderItemRepository();

export async function GET(request) {
  try {
    const orderItems = await orderItemRepository.getAll();

    return NextResponse.json(orderItems);
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
    const dto = new OrderItemRequestDto(body);
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

    const orderItemResponse = await orderItemRepository.create({
      ...dto.toData(),
    });
    return NextResponse.json(
      {
        data: orderItemResponse,
        message: "orderItem created Successfully!",
        validationErrors: [],
        success: true,
      },
      { status: 201 }
    );
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
