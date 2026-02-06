import { NextResponse } from "next/server";
import { OrderRepository } from "../../../../../data/repositories/order.repository";

const orderRepository = new OrderRepository();
export async function GET(req, { params }) {
  if (!params?.userId) {
    return NextResponse.json(
      { message: "USERID is required", success: false, data: null },
      { status: 400 }
    );
  }

  try {
    const userId = params.userId;

    const order = await orderRepository.findByUser(userId);
    // const orderDTO = orderMapper.toDTO(order);
    return NextResponse.json(order);
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
