import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { OrderRepository } from "../../../data/repositories/order.repository";
import { OrderRequestDto } from "../../../data/dtos/order-request.dto";
import { displayValidationErrors } from "../../../lib/displayValidationErrors";
// import authOptions from "../../../lib/options";
// import { getServerSession } from "next-auth";

const orderRepository = new OrderRepository();

export async function GET(request) {
  try {
    const orders = await orderRepository.getAll();

    return NextResponse.json(orders);
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
  try {
    const body = await request.json();
    const dto = new OrderRequestDto(body);

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

    const orderResponse = await orderRepository.create({
      ...dto.toData(),
    });

    return NextResponse.json(
      {
        ...orderResponse.toJSON(),
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
