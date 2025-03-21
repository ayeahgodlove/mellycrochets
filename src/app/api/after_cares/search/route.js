import { AfterCareRepository } from "../../../../data/repositories/after-care.repository";
import { NextResponse } from "next/server";

const afterCareRepository = new AfterCareRepository();

export async function GET(request) {
  const { searchParams } = new URL(request.url); // ✅ this works reliably
  const query = searchParams.get("q") || "";
  try {
    const afterCares = await afterCareRepository.getAll();
    const filtered = afterCares.map(care => care.toJSON()).filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    return NextResponse.json(filtered);
  } catch (error) {
    console.log("error: ", error.message);
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
