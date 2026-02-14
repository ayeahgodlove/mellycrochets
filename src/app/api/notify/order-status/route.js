import { NextResponse } from "next/server";
import { notifyCustomerOrderStatus } from "../../../../lib/notify.service";

/**
 * POST /api/notify/order-status
 * Body: { orderId, status: 'completed'|'failed'|'PAID'|'CANCELLED', email, telephone?, orderNo? }
 * Sends email and WhatsApp to the customer about their order status.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, status, email, telephone, orderNo } = body;
    if (!email || !orderNo) {
      return NextResponse.json(
        { success: false, message: "email and orderNo are required" },
        { status: 400 }
      );
    }
    await notifyCustomerOrderStatus({
      email,
      telephone: telephone || "",
      orderNo,
      status: status || "completed",
      orderId,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order status notify failed:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
